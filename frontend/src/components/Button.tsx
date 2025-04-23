import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="bg-gray-500 text-white px-3 py-[3px] rounded-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
