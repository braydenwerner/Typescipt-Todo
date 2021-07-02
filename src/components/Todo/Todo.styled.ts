import styled from 'styled-components'

export const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  min-height: 30px;
  font-size: 20px;
  color: white;
`

export const EditorInput = styled.input`
  width: 210px;
  padding: 0;
  word-wrap: break-word;
  outline: none;
  border: none;
  font-size: 20px;
  opacity: 0.98;
  background-color: #222222;
  border-radius: 5px;
  color: white;
`

export const EditorInputForm = styled.form`
  display: flex;
  align-items: center;
`

interface TodoTitleProps {
  checked: boolean
}
export const TodoTitle = styled.div<TodoTitleProps>`
  width: 210px;
  word-wrap: break-word;
  text-decoration: ${(props) => (props.checked ? ' line-through' : 'none')};
`

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  outline: none;
  width: 16px;
  height: 16px;
  border-radius: 3px;
`

export const DeleteEditContainer = styled.div`
  display: flex;
  position: relative;
  right: -20px;
  justify-content: space-around;
  width: 60px;
`
