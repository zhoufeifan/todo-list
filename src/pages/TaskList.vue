<template>
  <div class="page-container">
    <p class="user-info" v-if="window.userInfo">
      你好，{{window.userInfo.userName}}
      <a @click="loginOut">退出</a>
    </p>
    <div class="task-list-container">
      <TaskBoard class="task-1" title="很重要 很紧急" :taskList="getTaskListByType('1')" type="1" @addTodoItem="addTodoByType"/>
      <TaskBoard class="task-2" title="很重要 不紧急" :taskList="getTaskListByType('2')" type="2" @addTodoItem="addTodoByType"/>
      <TaskBoard class="task-3" title="不重要 很紧急" :taskList="getTaskListByType('3')" type="3" @addTodoItem="addTodoByType"/>
      <TaskBoard class="task-4" title="不重要 不紧急" :taskList="getTaskListByType('4')" type="4" @addTodoItem="addTodoByType"/>
    </div>
  </div>
</template>

<script>
  import TaskBoard from '@/components/TaskBoard.vue';
  export default {
    async beforeMount(){
      this.taskList = await this.getTodoList();
    },
    data () {
      return {
        taskList:[],
        window:window
      }
    },
    methods:{
      async loginOut(){
        await this.$request({
          url:"/user/loginOut",
        });
        this.$Message.success({
          content: "退出成功",
          duration: 1,
          onClose: ()=>{
            this.$router.push({path: '/login'});
          }
        });
      },
      async addTodoByType(type,title,callback){
        try {
          await this.$request({
            url:"/todo/addTodo",
            data:{
              type,
              title
            }
          });
          callback && callback();
          this.taskList = await this.getTodoList();
        }catch (e){

        }
      },
      getTaskListByType(type) {
        return this.taskList.filter(item=>item.type === type);
      },
       getTodoList(){
        try{
          return this.$request({url:"/todo/getTodoList"});
        }catch (e){
          return [];
        }
      }
    },
    components: {
      TaskBoard
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../style/mixin.scss";
  .user-info{
    @include Height(30px);
    text-align: right;
    margin-right: 30px;
    font-size: 18px;
  }
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
      top: 0;
    }
  }
  .task-list-container{
    position: absolute;
    width: 100%;
    height: 100%;
    flex: 1;
    flex-direction: row;
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    .task-1,.task-3{
      border-right: 1px solid #d9d9d9;
    }
  }

</style>
