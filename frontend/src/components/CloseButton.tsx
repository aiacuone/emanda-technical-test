import React from 'react'

interface CloseButtonProps {
  onClick: () => void
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white bg-red-500 rounded px-[6px] py-[1px] text-sm cursor-pointer border-none"
    >
      X
    </button>
  )
}
