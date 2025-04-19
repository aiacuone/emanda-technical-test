import React, { useState } from "react";
import { Button } from "./Button";
import { CloseButton } from "./CloseButton";

interface AddInputProps {
  onClose?: () => void;
  onAdd: (value: string) => void;
  placeholder?: string;
}

export const AddInput: React.FC<AddInputProps> = ({
  onClose,
  onAdd,
  placeholder = "New Task",
}) => {
  const [input, setInput] = useState("");
  const showCloseButton = !!onClose;

  const onClickAdd = () => {
    onAdd(input);
    setInput("");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-300 rounded-md px-2 flex-1"
        autoFocus
        placeholder={placeholder}
      />
      <div className="flex gap-1">
        <Button onClick={onClickAdd}>Add</Button>
        {showCloseButton && <CloseButton onClick={onClose} />}
      </div>
    </div>
  );
};
