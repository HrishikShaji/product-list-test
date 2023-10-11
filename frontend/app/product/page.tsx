"use client";

import { CategoryChild } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const createCategoryList = (
    categories: CategoryChild[],
    options: { value: string; name: string }[] = [],
  ) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const addProduct = async () => {
    const payload = {
      name: name,
      categoryId: category,
    };

    await axios.post("http://localhost:5000/api/product", payload);
    setName("");
  };
  return (
    <div className="flex flex-col gap-10 p-20">
      <div className="flex flex-col gap-2">
        <input
          placeholder="Product name"
          className="p-2 text-black"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <select
          className="text-black"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(data).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <button className="py-2 bg-neutral-700" onClick={addProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default Page;
