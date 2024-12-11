// import { useState } from 'react';
// import TodoEdit from './TodoEdit.tsx';
//
// interface TodoListProps {
//   todos: string[];
//   onDelete: (index: number) => void;
// }
//
// export function TodoList({ todos, onDelete }: TodoListProps) {
//   const [isEdit, setIsEdit] = useState(false);
//
//   function handleEdit() {
//     setIsEdit((pre) => !pre);
//   }
//
//   return (
//     <ul>
//       {todos.map((todo, index) => (
//         <li className='flex justify-around border' key={index}>
//           {isEdit ? (
//             <>
//               <button onClick={handleEdit}>완료</button>
//             </>
//           ) : (
//             <>
//               {todo}
//               <div>
//                 <button onClick={() => onDelete(index)}>삭제</button>
//                 <button onClick={handleEdit}>수정</button>
//               </div>
//             </>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// }
import { useState } from 'react';
import TodoEdit from './TodoEdit';
import { Todo } from '../App.tsx';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (id: string, newValue: string) => void;
  onToggleComplete: (id: string) => void;
}

export function TodoList({ todos, onDelete, onEdit, onToggleComplete }: TodoListProps) {
  const [editingIndex, setEditingIndex] = useState<string | null>(null);

  return (
    <ul>
      {todos.map(({ text, id, isCompleted }) => (
        <li
          className='flex justify-between items-center border w-full p-2'
          key={id}
        >
          <input type='checkbox' checked={isCompleted} onChange={() => onToggleComplete(id)}/>
          {editingIndex === id ? (
            <TodoEdit
              initialValue={text}
              onSave={(newValue) => {
                onEdit(id, newValue);
                setEditingIndex(null);
              }}
              onCancel={() => setEditingIndex(null)}
            />
          ) : (
            <>
              <span>{text}</span>
              <div className='flex gap-3'>
                <button onClick={() => onDelete(id)}>삭제</button>
                <button onClick={() => setEditingIndex(id)}>수정</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
