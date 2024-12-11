import { FormEvent } from 'react';

interface TodoFormProps {
  value: string;
  setValue: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export function TodoForm({ value, setValue, onSubmit }: TodoFormProps) {
  return (
    <form onSubmit={onSubmit} className='flex justify-center gap-5'>
      <label htmlFor='todo'>오늘의 할일</label>
      <input
        id='todo'
        className='border'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type='submit'>추가</button>
    </form>
  );
}