import React from 'react'
import crossIcon from '../images/icon-cross.svg';
import checkIcon from '../images/icon-check.svg';
import { useSelector } from 'react-redux';
import {selectDarkMode } from '../features/slices/themeSlice';
import {completeTodo} from '../features/slices/todosSlice'
import {removeTodo} from '../features/slices/todosSlice'
import { useDispatch } from 'react-redux';



export const Todo = ({content, completed, id}) => {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const completeTodoHandler = () => {
    dispatch(completeTodo(id))
  }

  const removeTodoHandler = () => {
    dispatch(removeTodo(id))
  }

  return (
    <div className='todo_container' onClick={completeTodoHandler}>
        <div className={`circle ${completed ? 'active' : ''}`}>
            <img src={checkIcon} alt='checkIcon'/>
        </div>

        <li className={`todo ${darkMode ? "whiteBg" : ""} ${completed ? "active" : ""}`}>{content}</li>

        <img src={crossIcon} className="delete-icon" alt="delete-icon" onClick={removeTodoHandler} />
    </div>
  )
}
