import './App.css';
import { FormEvent, useEffect, useReducer, useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';

export type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

type TodoAction =
  | { type: 'ADD_TODO'; payload: { id: string; text: string } }
  | { type: 'EDIT_TODO'; payload: { id: string; text: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'TOGGLE_ALL' }
  | { type: 'RESET' };

function reducer(todos: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...todos,
        {
          id: action.payload.id,
          text: action.payload.text,
          isCompleted: false,
        },
      ];

    case 'EDIT_TODO':
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );

    case 'DELETE_TODO':
      return todos.filter((todo) => todo.id !== action.payload.id);

    case 'TOGGLE_TODO':
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

    case 'TOGGLE_ALL':
      const areAllCompleted = todos.every((todo) => todo.isCompleted);
      return todos.map((todo) => ({
        ...todo,
        isCompleted: !areAllCompleted,
      }));

    case 'RESET':
      return [];

    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [], () => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [value, setValue] = useState('');

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.isCompleted).length,
    allCompleted: todos.length > 0 && todos.every((todo) => todo.isCompleted),
  };

  function handleAddTodo(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) {
      return alert('할일을 입력해주세요.');
    }
    dispatch({
      type: 'ADD_TODO',
      payload: { id: uuidv4(), text: value },
    });
    setValue('');
  }

  function handleEditTodo(id: string, text: string) {
    dispatch({ type: 'EDIT_TODO', payload: { id, text } });
  }

  function handleDeleteTodo(id: string) {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  }

  function handleToggleComplete(id: string) {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  }

  function handleToggleAll() {
    dispatch({ type: 'TOGGLE_ALL' });
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className='flex justify-between p-3'>
        <TodoForm value={value} setValue={setValue} onSubmit={handleAddTodo} />
        <button className='' onClick={() => dispatch({ type: 'RESET' })}>
          초기화
        </button>
        <p>
          {stats.completed} / {stats.total}{' '}
          <button onClick={handleToggleAll}>전체 선택</button>
        </p>
      </div>
      <TodoList
        onEdit={handleEditTodo}
        todos={todos}
        onDelete={handleDeleteTodo}
        onToggleComplete={handleToggleComplete}
      />
    </>
  );
}

export default App;

// /*
// index로 한거 id로 바꾸기.
//  추가하기
//  수정하기 ㅇ
//  상태 어떻게?
//  ref
//  저장하기 로컬스토리지 ㅇ
//  언제저장한지 날짜
//  완료 ㅇ
//  전체 삭제 전체 선택 ㅇ
//  하이라이트하기 정렬
// */
//
