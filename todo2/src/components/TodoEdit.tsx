import { FormEvent, useState } from 'react';

interface TodoEditProps {
  initialValue: string;
  onSave: (newValue: string) => void;
  onCancel: () => void;
}

export default function TodoEdit({
  initialValue,
  onSave,
  onCancel,
}: TodoEditProps) {
  const [editValue, setEditValue] = useState(initialValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!editValue.trim()) {
      return alert('내용을 입력해주세요.');
    }
    onSave(editValue);
  };

  return (
    <div className="flex justify-between items-center w-full">
      <input
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        autoFocus
      />
      <form onSubmit={handleSubmit} className="flex gap-3">
        <button type="button" onClick={onCancel}>취소</button>
        <button type="submit">저장</button>
      </form>
    </div>
  );
}
