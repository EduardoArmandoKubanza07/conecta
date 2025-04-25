"use client";

import { useState } from "react";
import { FaLess, FaPlus } from "react-icons/fa";

const CartCounter = () => {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    const newCount = count + 1;
    setCount(newCount);
  };

  const handleRemove = () => {
    const newCount = count > 0 ? count - 1 : 0;
    setCount(newCount);
  };

  return (
    <div className="flex gap-2">
      <button onClick={handleRemove}>
        <FaLess size={32} />
      </button>
      {count}
      <button onClick={handleAdd}>
        <FaPlus size={32} />
      </button>
    </div>
  );
};

export default CartCounter;
