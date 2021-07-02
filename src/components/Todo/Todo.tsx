import React, { useEffect, useState, useRef } from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'

import { TodoType } from '../TodoList/TodoList'
import * as Styled from './Todo.styled'

interface TodoProps {
  todo: TodoType
  deleteTodo: (id: number) => void
  updateTodo: (id: number, newTitle: string) => void
  toggleChecked: (id: number) => void
}

export const Todo: React.FC<TodoProps> = ({
  todo,
  deleteTodo,
  updateTodo,
  toggleChecked,
}) => {
  //  when they hover, we want to show them and edit and a delete icon
  const [isHoveringTodo, setIsHoveringTodo] = useState<boolean>(false)
  //  this will be conditionally rendered and will take the place of the todo title when true
  const [isTodoEditorOpen, setIsTodoEditorOpen] = useState<boolean>(false)

  const editorFormRef = useRef() as React.MutableRefObject<HTMLInputElement>

  //  when you click the edit icon, the input should be focused
  useEffect(() => {
    if (isTodoEditorOpen && editorFormRef.current) editorFormRef.current.focus()
  }, [isTodoEditorOpen])

  const handleEditorSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!todo || !editorFormRef || !editorFormRef.current) return

    const formValue = editorFormRef.current.value

    //	whatever string validation you want here, probably same as in TodoList
    //  so you might want to create a validation form helper function for both
    if (formValue.length > 0 && formValue.length < 100)
      updateTodo(todo.id, formValue)

    editorFormRef.current.value = ''
    setIsTodoEditorOpen(false)
  }

  return (
    <Styled.TodoContainer
      onMouseEnter={() => setIsHoveringTodo(true)}
      onMouseLeave={() => setIsHoveringTodo(false)}
    >
      <Styled.Checkbox
        checked={todo.isChecked}
        onClick={() => toggleChecked(todo.id)}
        readOnly={true}
      />
      {isTodoEditorOpen ? (
        <Styled.EditorInputForm onSubmit={handleEditorSubmit}>
          <Styled.EditorInput ref={editorFormRef} defaultValue={todo.title} />
        </Styled.EditorInputForm>
      ) : (
        <Styled.TodoTitle checked={todo.isChecked}>
          {todo.title}
        </Styled.TodoTitle>
      )}
      {isHoveringTodo && (
        <Styled.DeleteEditContainer>
          <BsTrashFill size={20} onClick={() => deleteTodo(todo.id)} />
          <AiFillEdit
            size={20}
            onClick={() => {
              setIsTodoEditorOpen((oldIsTodoEditorOpen) => !oldIsTodoEditorOpen)
            }}
          />
        </Styled.DeleteEditContainer>
      )}
    </Styled.TodoContainer>
  )
}
