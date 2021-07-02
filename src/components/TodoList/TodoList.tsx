import React, { useRef } from 'react'

import { Todo } from '../index'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import * as Styled from './TodoList.styled'

type TodoList = TodoType[]

export interface TodoType {
  id: number
  title: string
  isChecked: boolean
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<TodoList | null>('todos', [])

  const formRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const addTodo = (formTitleValue: string) => {
    //  maximum of 10 todos
    if (todos && todos.length === 10) return

    setTodos((oldTodos) => {
      if (!oldTodos) return null

      return [
        ...oldTodos,
        {
          id: oldTodos.length > 0 ? oldTodos[oldTodos.length - 1].id + 1 : 1,
          title: formTitleValue,
          isChecked: false,
          willBeRemoved: false,
          checkedAt: null,
        },
      ]
    })
  }

  const deleteTodo = (id: number) => {
    setTodos((oldTodos) => {
      if (!oldTodos) return null

      return oldTodos.filter((todo: TodoType) => todo.id !== id)
    })
  }

  const updateTodo = (id: number, newTitle: string) => {
    setTodos((oldTodos) => {
      if (!oldTodos) return null

      return oldTodos.map((todo: TodoType) =>
        todo.id === id ? Object.assign({}, todo, { title: newTitle }) : todo
      )
    })
  }

  const toggleChecked = (id: number) => {
    //	if a todo is checked, it will still show for 5 seconds before deleting itself
    setTodos((oldTodos) => {
      if (!oldTodos) return null

      return oldTodos.map((todo: TodoType) =>
        todo.id === id
          ? Object.assign({}, todo, { isChecked: !todo.isChecked })
          : todo
      )
    })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef || !formRef.current) return

    const formValue = formRef.current.value

    //	whatever string validation you want here
    if (formValue.length > 0 && formValue.length < 100) addTodo(formValue)

    formRef.current.value = ''
  }

  return (
    <Styled.TodoListWrapper>
      <Styled.TodoListContainer>
        <Styled.TodoListHeader>Typescript Todos</Styled.TodoListHeader>
        {todos &&
          todos.map((todo: TodoType, i: number) => (
            <Todo
              key={i}
              todo={todo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
              toggleChecked={toggleChecked}
            />
          ))}
        <Styled.TodoForm onSubmit={handleFormSubmit}>
          <Styled.TodoInput ref={formRef} placeholder="New Todo" />
        </Styled.TodoForm>
      </Styled.TodoListContainer>
    </Styled.TodoListWrapper>
  )
}
