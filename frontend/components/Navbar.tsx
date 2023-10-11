import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="w-full py-5 bg-neutral-800 fixed top-0 z-20 justify-center items-center flex gap-10">
      <Link href="/">Home</Link>
      <Link href="/product">Add Products</Link>
      <Link href="/category">Add Category</Link>
    </div>
  );
};
