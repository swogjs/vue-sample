<template>
<div id="todo">
    <div class="panel panel-default">
        <div class="panel-heading">Todo List</div>
        <div class="panel-body">
            <div class="row" id="todoAdd">
                <div class="col-lg-12">
                    <div class="input-group">
                    <input type="text" class="form-control" 
                        placeholder="Todo List is ..." 
                        v-model="newTodoText"
                        @keyup.enter="addNewTodo"
                    >
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button" @click="addNewTodo">
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        </button>
                    </span>
                    </div><!-- /input-group -->
                </div><!-- /.col-lg-12 -->
            </div><!-- /.row -->
            <div class="row todoList" v-for="(item, index) in todos" :key="index">
                <div class="col-lg-12">
                    <div class="input-group">
                    <span class="input-group-addon">
                        <input type="checkbox" aria-label="..." @click="complateTodo(index)">
                    </span>
                    <input type="text" class="form-control" aria-label="..." 
                        :class="{complate: item.isComplate}"
                        :value="item.text"
                        @dblclick="editTodo(index)" 
                        @keyup.enter="saveTodo(index)"
                        :readonly="!item.isEdit"
                    >
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button" @click="removeTodo(index)">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </button>
                    </span>
                    </div><!-- /input-group -->
                </div><!-- /.col-lg-12 -->                
            </div><!-- /.row -->
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'todos',
  data : function(){
      return {
          todos : [],
          newTodoText: ''
      }
  },
  mounted: function(){
    $('#bs-example-navbar-collapse-1').collapse('hide')
  },
  methods: {
      //신규 항목 추가 
      addNewTodo: function(){
          if(this.newTodoText==''){
              alert('Todo List 항목을 입력해 주세요!!')
              return false
          }
          //항목 객체 
          var todoItem = {
              text: this.newTodoText,
              isComplate: false,
              isEdit: false
          }
          this.todos.push(todoItem)
          this.newTodoText = ''
      },
      //확인 체크 
      complateTodo: function(idx){
          this.todos[idx].isComplate = (this.todos[idx].isComplate) ? false : true
      },
      //수정 
      editTodo: function(idx){
          if(!this.todos[idx].isComplate){
              this.todos[idx].isEdit = true
          }else{
              alert('완료된 항목은 수정할 수 없습니다.')
          }
      },
      //수정된 내용 저장 
      saveTodo: function(idx){
          this.todos[idx].text = $('.todoList input[type=text]').eq(idx).val()
          this.todos[idx].isEdit = false
      },
      //항목 삭제 
      removeTodo: function(idx){
          this.todos.splice(idx, 1)
      }
  }
}
</script>
<style>
#todo{
    background: #fff;
}
#todoAdd{
    margin-bottom: 10px;
}
.todoList{
    margin-top: 10px;
}
.complate{
    text-decoration: line-through;
    color: #BFBFBF;
}
</style>

