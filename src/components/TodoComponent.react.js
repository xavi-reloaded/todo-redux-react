import React, { Component, PropTypes } from 'react'
import TodoItem from './TodoItem.react'
import Footer from './Footer'
import TodoTextInput from './TodoTextInput.react'
import classnames from 'classnames'

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

class MainSection extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { filter: SHOW_ALL, showTodoBoard: true }
  }

  handleClearCompleted() {
    this.props.actions.clearCompleted()
  }

  handleShow(filter) {
    this.setState({ filter })
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.actions.addTodo(text)
    }
  }

  handleShowTodoBoard() {
    console.log('como pedro por su casa')
    this.setState({ showTodoBoard: !this.state.showTodoBoard })
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.length}
               onChange={actions.completeAll} />
      )
    }
  }



  renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      )
    }
  }

  render() {
    const { todos, actions } = this.props
    const { filter } = this.state

    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )

    return (
      <section className="main">


        <div id="todo" className={ classnames({ show: this.state.showTodoBoard })} style={{opacity: '1'}} >
          <div className="pane todo-pane todo-list" style={{'maxHeight': '300px' }}>
            <div className="todo-list-header">

              <div id="todo-close">{ this.renderToggleAll(completedCount) }</div>
              <div id="todo-count">{ todos.length + ' to do' }</div>

            </div>

            <hr/>

            <ol>
              {filteredTodos.map(todo =>
                <TodoItem key={todo.id} todo={todo} {...actions} />
              )}
            </ol>

            <hr/>

            <TodoTextInput newTodo onSave={this.handleSave.bind(this)} placeholder="New Todo" />



          </div>
          <span id="todo-remaining"></span>
          <span className="toggle todo-toggle" onClick={this.handleShowTodoBoard.bind(this)}>Todo</span>

        </div>

      </section>
    )
  }
}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection
