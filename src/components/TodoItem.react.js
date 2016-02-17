import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput.react'

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
  }

  handleDoubleClick() {
    this.setState({ editing: true })
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }


  render() {
    const { todo, completeTodo, deleteTodo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      element = (

          <div className="view">
          <a className="destroy" onClick={() => deleteTodo(todo.id)}>✕</a>
          <label><input className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => completeTodo(todo.id)} /></label>
          <span onDoubleClick={this.handleDoubleClick.bind(this)}>{todo.text}</span>
          </div>

          //<input className="edit todo-input" type="text" value={todo.text}/>
      )
    }

    return (
      <li draggable="true" className={classnames({
        completed: todo.completed,
        editing: this.state.editing,
        done: todo.completed
      })}>
        {element}
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
}

export default TodoItem


//<div className="view">
//    <input classNa
// me="toggle"
//type="checkbox"
//checked={todo.completed}
//onChange={() => completeTodo(todo.id)} />
//<label onDoubleClick={this.handleDoubleClick.bind(this)}>
//{todo.text}
//</label>
//<button className="destroy"
//        onClick={() => deleteTodo(todo.id)} />
//</div>
