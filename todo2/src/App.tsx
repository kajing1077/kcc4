// import './App.css';
// import { FormEvent, useEffect, useState } from 'react';
// import { TodoForm } from './components/TodoForm';
// import { TodoList } from './components/TodoList';
// import { v4 as uuidv4 } from 'uuid';
//
// type Todo = [
//   {
//     id: string;
//     todo: string;
//   },
// ];
//
// function App() {
//   const [todos, setTodos] = useState<Todo>(() => {
//     const savedTodos = localStorage.getItem('todos');
//     return savedTodos ? JSON.parse(savedTodos) : [];
//   });
//   const [value, setValue] = useState('');
//   const uuid = uuidv4();
//
//   function handleAddTodo(e: FormEvent) {
//     e.preventDefault();
//     if (value.length === 0) {
//       return alert('할일을 입력해주세요.');
//     }
//
//     const nextTodos = [...todos];
//
//     setTodos([...nextTodos, { id: uuid, todo: value }]);
//     setValue('');
//   }
//
//   function handleEditTodo(index: number, newValue: string) {
//     const newTodos = [...todos];
//     newTodos[index] = newValue;
//     setTodos(newTodos);
//   }
//
//   function handleDeleteTodo(indexToDelete: number) {
//     setTodos(todos.filter((_, index) => index !== indexToDelete));
//   }
//
//   useEffect(() => {
//     localStorage.setItem('todos', JSON.stringify(todos));
//   }, [todos]);
//
//   return (
//     <>
//       <button onClick={() => setTodos([])}>초기화</button>
//       <TodoForm value={value} setValue={setValue} onSubmit={handleAddTodo} />
//       <TodoList
//         onEdit={handleEditTodo}
//         todos={todos}
//         onDelete={handleDeleteTodo}
//       />
//     </>
//   );
// }
//
// /*
// index로 한거 id로 바꾸기.
//  추가하기
//  수정하기 ㅇ
//  상태 어떻게?
//  ref
//  저장하기 로컬스토리지 ㅇ
//  언제저장한지 날짜
//  완료
//  전체 삭제 전체 선택
//  하이라이트하기 정렬
// */
//
// export default App;

import './App.css';
import { FormEvent, useEffect, useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';

export type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [value, setValue] = useState('');

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.isCompleted).length,
    allCompleted: todos.length > 0 && todos.every(todo => todo.isCompleted)
  };

  function handleAddTodo(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) {
      return alert('할일을 입력해주세요.');
    }

    setTodos([...todos, { id: uuidv4(), text: value, isCompleted: false }]);
    setValue('');
  }

  function handleEditTodo(id: string, newValue: string) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newValue } : todo))
    );
  }

  function handleDeleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleToggleComplete(id: string) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  function handleToggleAll() {
    const areAllCompleted = todos.every(todo => todo.isCompleted);
    setTodos(todos.map(todo => ({
      ...todo,
      isCompleted: !areAllCompleted
    })));
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className='flex justify-between p-3'>
        <TodoForm value={value} setValue={setValue} onSubmit={handleAddTodo} />
        <button className='' onClick={() => setTodos([])}>
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
