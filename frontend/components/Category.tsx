"use client";

import axios from "axios";
import { useState } from "react";

interface CategoryProps {
  category: Record<string, any>;
}

export const Category: React.FC<CategoryProps> = ({ category }) => {
  const [cat, setCategory] = useState("");

  const addSubCategory = async () => {
    const payload = {
      name: cat,
      parentId: category.id,
    };
    await axios.post("http://localhost:5000/api/category", payload);
    setCategory("");
  };
  return (
    <div className=" flex flex-col gap-2">
      <h1>{category.name}</h1>
      <div className="flex gap-2">
        <input
          value={cat}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Add SubCategory"
          className="p-2 text-black"
        />
        <button className="bg-neutral-700 p-2" onClick={addSubCategory}>
          Add
        </button>
      </div>
    </div>
  );
};
