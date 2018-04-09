<template>
  <div class="page-container">
    <p class="user-info" v-if="window.userInfo">
      你好，{{window.userInfo.userName}}
      <a @click="loginOut">退出</a>
    </p>
    <Form class="condition-form" :model="conditionForm" :label-width="100" inline>
      <FormItem label="事项范围" class="form-item">
        <DatePicker type="daterange"
                    v-model="conditionForm.dateRange"
                    class="date-picker"
                    :options="options"
                    placement="bottom-start"
                    @on-change="handleDateTimeChange"
                    placeholder="请选择日期">
        </DatePicker>
      </FormItem>
      <FormItem label="查看已完成事项" class="form-item">
        <i-switch v-model="conditionForm.lookUpFinishedTask" size="large">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>
    </Form>
    <div class="task-list-container">
      <TaskBoard class="task-1" title="很重要 很紧急"
                 :taskList="getTaskListByType('1')"
                 type="1"
                 @addTodoItem="addTodoByType"
                 @doneTodoItem="doneTodoById"
                 @removeTodoItem="removeTodoById"
      />
      <TaskBoard class="task-2" title="很重要 不紧急"
                 :taskList="getTaskListByType('2')"
                 type="2"
                 @addTodoItem="addTodoByType"
                 @doneTodoItem = "doneTodoById"
                 @removeTodoItem="removeTodoById"
      />
      <TaskBoard class="task-3" title="不重要 很紧急"
                 :taskList="getTaskListByType('3')"
                 type="3"
                 @addTodoItem="addTodoByType"
                 @doneTodoItem = "doneTodoById"
                 @removeTodoItem="removeTodoById"
      />
      <TaskBoard class="task-4" title="不重要 不紧急"
                 :taskList="getTaskListByType('4')"
                 type="4" @addTodoItem="addTodoByType"
                 @doneTodoItem = "doneTodoById"
                 @removeTodoItem="removeTodoById"
      />
    </div>
  </div>
</template>

<script>
  import TaskBoard from '@/components/TaskBoard.vue';
  import {dateTime} from 'terrible-utils';

  const {dateTimeFormat} = dateTime;

  export default {
    async beforeMount(){
      this.taskList = await this.getTaskList();
    },
    data () {
      return {
        taskList:[],
        conditionForm: {
          dateRange:[ dateTimeFormat(new Date()), dateTimeFormat(new Date())],
          lookUpFinishedTask: false
        },
        window:window,
        options:{
          shortcuts: [
            {
              text: '1周',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '1个月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: '3个月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            }
          ]
        }
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
            url:"/todo/addTask",
            data:{
              type,
              title
            }
          });
          callback && callback();
          this.taskList = await this.getTaskList();
        }catch (e){
          console.log(e);
        }
      },

      getTaskListByType(type) {
        return this.taskList.filter(item=>{
          return (item.type === type && (this.conditionForm.lookUpFinishedTask ? item.isFinished : true))
        });
      },

      async handleDateTimeChange(dateRange){
        this.conditionForm.dateRange = dateRange;
        this.taskList = await this.getTaskList();
      },

      getTaskList(){
        let {dateRange:[beginTime,endTime]} = this.conditionForm;
        try{
          return this.$request({
            url:"/todo/getTaskList",
            data:{
              beginTime,
              endTime
            }
          });
        }catch (e){
          return [];
        }
      },

      async doneTodoById(id,isDone,callback){
        try {
          await this.$request({
            url:"todo/finishedTasks",
            data:{
              idList:id
            }
          });
          callback && callback();
          this.taskList = await this.getTaskList();
        }catch (e){
          console.log(e);
        }
      },

      async removeTodoById(id,callback){
        try {
          await this.$request({
            url:"todo/removeTodos",
            data:{
              idList:id
            }
          });
          callback && callback();
          this.taskList = await this.getTaskList();
        }catch (e){
          console.log(e);
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
  .page-container{
    padding-left: 30px;
    padding-right: 30px;
    .condition-form{
      padding-top: 10px;
      padding-bottom: 10px;
      &>.form-item{
        margin-bottom: 0;
      }
      .ivu-col{
        @include Height(32px);
      }
      .date-picker{
        width: 200px;
      }
      .todo-switch{
        margin-left: 20px;
      }
    }
  }
  .user-info{
    @include Height(40px);
    text-align: right;
    font-size: 18px;
    border-bottom: 1px solid #d9d9d9;
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
    left: 0;
    right: 0;
    height: 100%;
    flex: 1;
    flex-direction: row;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    .task-1,.task-3{
      border-right: 1px solid #d9d9d9;
    }
  }

</style>
