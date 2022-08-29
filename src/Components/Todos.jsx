import React, {useRef} from 'react'
import moonIcon from '../images/icon-moon.svg'
import sunIcon from '../images/icon-sun.svg'
import {Todo}  from './Todo';
import { useDispatch, useSelector } from 'react-redux';
import { selectDarkMode, toggleTheme } from '../features/slices/themeSlice';
import {
    addTodo,
    clearCompleted,
    selectActiveTodos,
    selectCompletedTodos,
    selectShowActiveTodos,
    selectShowCompletedTodos,
    selectShowTodos,
    selectTodos
} from '../features/slices/todosSlice'

import { showCompletedFuntion } from '../features/slices/todosSlice';
import { showAllFuntion } from '../features/slices/todosSlice';
import { showActiveFuntion } from '../features/slices/todosSlice';



export const Todos = () => {

    const inputRef = useRef();

    const darkMode = useSelector(selectDarkMode);
    const dispatch = useDispatch();

    const todos = useSelector(selectTodos);
    const completedTodos = useSelector(selectCompletedTodos);
    const activeTodos = useSelector(selectActiveTodos);

    const showTodos = useSelector(selectShowTodos);
    const showActiveTodos = useSelector(selectShowActiveTodos);
    const showCompletedTodos = useSelector(selectShowCompletedTodos);
     
    let todosToRender;
    let activeTodosNumber = 0;

    const submitTodo = (e) => {
        e.preventDefault();

        if(inputRef.current.value.trim()){
            dispatch(addTodo({
                id: Math.random() * 1000,
                content: inputRef.current.value,
                completed: false
            }))
        }

        inputRef.current.value = ""
    }

    const showCompletedHandler = () => {
        dispatch(showCompletedFuntion())
    }

    const showAllHandler = () => {
        dispatch(showAllFuntion())
    }

    const showActiveHandler = () => {
        dispatch(showActiveFuntion())
    }
    
    const clearCompletedHandler = () => {
        dispatch(clearCompleted())
    }

    if(showActiveTodos){
        todosToRender = activeTodos;
    }else if(showCompletedTodos){
        todosToRender = completedTodos;
    }else{
        todosToRender = todos;
    }

    todos?.forEach((todo) => {
        if(!todo.completed){
            activeTodosNumber++;
        }
    })

  return (
    <div className='todos'>
        <div className='todosHeader'>
            <h1>TODOS</h1>
            {darkMode ? (
                <img src={moonIcon} alt="i-moon" onClick={() => dispatch(toggleTheme())} />
                
            ) : (
                <img src={sunIcon} alt="i-son" onClick={() => dispatch(toggleTheme())} />
            )}
        </div>

        <div className='imput_container'>
            <div className='circle'></div>
            <form onSubmit={submitTodo}>
                <input type='text' ref={inputRef} placeholder='Create a new todo...'
                className={darkMode ? "whiteBg" : ""}/>
                <button type='submit' hidden></button>
            </form>
        </div>

        <div className={`todos_container ${darkMode ? "active" : ""}`}>
            {todosToRender.map((todo) => (
                <Todo 
                    content={todo.content}
                    key={todo.id}
                    id={todo.id}
                    completed={todo.completed}
                />
            ))}
            <div className={`todos_footer ${darkMode ? "whiteBg" : ""}`}>
                <p>{activeTodosNumber} items left</p>

                <div className='types'>
                    <div className='types'>
                        <p className={`clear ${showTodos ? "active" : ""}`} onClick={showAllHandler}>All</p>

                        <p className={`clear ${showActiveTodos ? "active" : ""}`} onClick={showActiveHandler}>Active</p>
                            
                        <p className={`clear ${showCompletedTodos ? "active" : ""}`} onClick={showCompletedHandler}>Completed</p>
                    </div>
                </div>
                <p className='clear' onClick={clearCompletedHandler}>Clear completed</p>
            </div>
        </div>        
    </div> 
  )
}
