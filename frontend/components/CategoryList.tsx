import { CategoryChild } from "@/types/types";
import { Category } from "./Category";
import React from "react";

interface CategoryListProps {
  categories: CategoryChild[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <ul>
      {categories.map((category) => (
        <li key={category._id}>
          <Category category={category} />
          {category.children.length > 0 && (
            <div className="ml-10">
              <CategoryList categories={category.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
