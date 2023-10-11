import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db";
dotenv.config();
import Category from "./models/Category";
import {
  Category as CategoryType,
  CategoryChild,
  Product as ProductType,
} from "./types";
import Product from "./models/Product";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

connectDB();
app.use(cors(corsOptions));
app.use(express.json());

const createCategories = (
  categories: CategoryType[],
  parentId: string | null = null,
) => {
  const categoryList: CategoryChild[] = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == null);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate.id,
      name: cate.name,
      children: createCategories(categories, cate.id),
    });
  }
  return categoryList;
};

app.get("/api/category", async (req, res) => {
  const parentId = req.query.parentId?.toString();
  if (parentId) {
    const category = await Category.find({ parentId: parentId });

    res.status(200).json(category);
  } else {
    const category = await Category.find({});
    res.status(200).json(category);
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find({});

    if (categories) {
      const categoryList = createCategories(categories as any);
      console.log(categoryList);
      res.status(200).json(categoryList);
    }
  } catch (error) {
    res.status(500);
  }
});

app.post("/api/category", async (req, res) => {
  const name = req.body.name;
  const parentId = req.body?.parentId ? req.body.parentId : null;

  const category = await Category.create({ name: name, parentId: parentId });

  res.status(200).json(category);
});

app.post("/api/product", async (req, res) => {
  const name = req.body.name;
  const categoryId = req.body.categoryId;

  const product = await Product.create({ name: name, categoryId: categoryId });

  res.status(200).json(product);
});

const getAllProductsInCategory = async (
  categoryId: string,
): Promise<ProductType[]> => {
  const productsInCategory: ProductType[] = await Product.find({
    categoryId: categoryId,
  });

  const subcategories: CategoryType[] = await Category.find({
    parentId: categoryId,
  });

  const subcategoryProducts: ProductType[][] = await Promise.all<ProductType[]>(
    subcategories.map((subcategory) =>
      getAllProductsInCategory(subcategory.id),
    ),
  );

  const allProducts: ProductType[] = productsInCategory.concat(
    subcategoryProducts.flat(),
  );

  return allProducts;
};

app.get("/api/products", async (req, res) => {
  const categoryId = req.query.categoryId?.toString();
  if (categoryId) {
    const allProducts = await getAllProductsInCategory(categoryId);
    res.status(200).json(allProducts);
  } else {
    const products = await Product.find({});
    res.status(200).json(products);
  }
});
app.listen(process.env.PORT || 5000, () =>
  console.log("server runnning on :" + process.env.PORT),
);
