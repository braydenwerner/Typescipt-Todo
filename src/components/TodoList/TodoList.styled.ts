import styled from 'styled-components'

export const TodoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

export const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #181818;
  width: 400px;
  border-radius: 10px;
  opacity: 0.98;
`

export const TodoListHeader = styled.div`
  font-size: 30px;
  font-weight: bold;
  font-family: Times New Roman;
  padding: 30px;
  text-decoration: underline;
  color: white;
`

export const TodoForm = styled.form`
  display: flex;
  align-items: center;
`

export const TodoInput = styled.input`
  outline: none;
  border: none;
  font-weight: bold;
  height: 50px;
  font-size: 20px;
  font-family: Times New Roman;
  opacity: 0.98;
  background-color: #181818;
  margin-bottom: 15px;
  color: white;
`
