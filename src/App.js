import React, {  } from 'react';
import './App.css';
window.id = 0;
const TodoForm = ({addTodo}) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        addTodo(input.value);
        input.value = '';
      }}>
        +
      </button>
    </div>
  );
};

const Todo = ({todo, remove}) => {
  return (<li  onClick={() => {remove(todo.id)}}>{todo.text}</li>);
}

const TodoList = ({todos, remove}) => {
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return (<ul>{todoNode}</ul>);
}

const Title = ({todoCount}) => {
  return (
    <div>
       <div>
          <h1>to-do ({todoCount})</h1>
       </div>
    </div>
  );
}

window.id = 0;
class TodoApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [{text: "testtt", id: window.id++}]
    }
  }
  addTodo(val){
    if(val) {
      const todo = {text: val, id: window.id++}
      this.state.data.push(todo);
      this.setState({data: this.state.data});
    }
  }
  handleRemove(id){
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) {
        return todo;
      }
      return null;
    });
    this.setState({data: remainder});
  }

  render(){
    return (
      <div>
        <Title todoCount={this.state.data.length}/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}

export default TodoApp;
