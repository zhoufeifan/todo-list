<template>
  <div class="task-board">
    <div class="add-todo-input-container" v-show="inputVisible">
      <input placeholder="输入任务，按Enter键完成" v-model="itemTitle" ref="todoInput" @blur="todoInputBlur" @keydown="inputKeyDown"/>
    </div>
    <div class="task-board-title" @click="showAddTodoInput">
      {{title}}
      <Icon class="add-icon" type="plus-round"></Icon>
    </div>
    <div class="task-container">
      <div class="task-item" v-for="(item,index) in taskList" :key="item.id" @click="done">
        <Checkbox v-model="item.isFinished">{{item.title}}</Checkbox>
        <span class="item-time">{{item.isFinished ? getTime() : getTime(item.createdTime)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {dateTime} from 'terrible-utils';

  const {dateTimeFormat} = dateTime;

  export default {
    name: 'TaskBoard',
    props: {
      title: String,
      color: String,
      type: String,
      taskList: Array
    },
    data() {
      return {
        inputVisible: false,
        itemTitle: ""
      }
    },
    computed: {},
    methods: {
      done() {
      },
      inputKeyDown(e){
        if(e.keyCode === 13){
          this.addTodo();
        }
      },
      showAddTodoInput() {
        this.inputVisible = true;
        setTimeout(() => {
          this.$refs.todoInput.focus();
        }, 0);
      },
      addTodo() {
        if(!this.itemTitle){
          this.$Message.error('任务项必填');
          return;
        }
        this.$emit('addTodoItem', this.type, this.itemTitle,()=>{
          this.$Message.success("添加成功");
          this.$refs.todoInput.blur();
        });

      },
      todoInputBlur() {
        this.inputVisible = false;
        this.itemTitle = '';
      },
      getTime(timeStamp) {
        return dateTimeFormat(timeStamp ? new Date(timeStamp) : new Date());
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .task-board {
    padding: 15px;
    width: 50%;
    position: relative;
    border-top: solid 1px #d9d9d9;
    .add-todo-input-container {
      border: solid 1px;
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      display: flex;
      input {
        height: 32px;
        flex: 1;
        border: none;
        background-color: transparent;
        padding-left: 10px;
        &::-webkit-input-placeholder {
          color: #666666;
          font-size: 14px;
        }
      }
      .confirm-icon {
        margin-top: 1px;
        width: 30px;
        height: 30px;
        display: inline-block;
        font-size: 28px;
        text-align: center;
      }
    }
    .task-board-title {
      padding: 10px;
      text-align: left;
      font-size: 18px;
      cursor: pointer;
      .add-icon {
        float: right;
        margin-top: 3px;
      }
    }
    .task-container {
      margin-top: 10px;
      .task-item {
        display: flex;
        cursor: pointer;
        &:hover {
          background-color: #f5f5f5;
        }
      }
      .item-time {
        margin-left: auto;
      }
    }

    &.task-1 {
      .task-board-title, .add-icon {
        color: #ed3f14 !important;
        background-color: #FFEDE7;
      }
      .add-todo-input-container {
        background-color: #FFEDE7;
        border-color: #F76333;
      }
    }
    &.task-2 {
      .task-board-title, .add-icon {
        color: #ff9900 !important;
        background-color: #FFEFCB;
      }
      .add-todo-input-container {
        background-color: #FFEFCB;
        border-color: #FEAE6A;
      }
    }
    &.task-3 {
      .task-board-title, .add-icon {
        color: #2d8cf0 !important;
        background-color: #D6F4FE;
      }
      .add-todo-input-container {
        background-color: #D6F4FE;
        border-color: #3FB6DA;
      }
    }
    &.task-4 {
      .task-board-title, .add-icon {
        color: #19be6b !important;
        background-color: #EFD;
      }
      .add-todo-input-container {
        background-color: #EFD;
        border-color: #89C557;
      }
    }
  }
</style>
