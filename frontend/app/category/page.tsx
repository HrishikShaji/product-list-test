"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CategoryList from "@/components/CategoryList";

const Page = () => {
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  const addCategory = async () => {
    const payload = {
      name: category,
    };
    await axios.post("http://localhost:5000/api/category", payload);
    setCategory("");
  };
  console.log(data);

  return (
    <div className="p-20 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <input
          placeholder="Add Category"
          className="p-2 text-black"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button className="bg-neutral-700 py-2" onClick={addCategory}>
          Add
        </button>
      </div>
      <div>
        <CategoryList categories={data} />
      </div>
    </div>
  );
};

export default Page;
