'use client';

import React from "react";
import Link from "next/link";
import { useCategoryStore } from "../../../lib/slice/categoryStore";

// Function to convert a string to a URL-friendly slug
const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with one
    .trim('-'); // Trim any leading or trailing hyphens
};

const categories = [
  { name: "Fire Safes", description: "Safeguard your valuables and documents with our top-rated fire safes, built to endure extreme temperatures and flame damage.", image: "/home/card/Fire-Safes-card.png", categoryId: 12 },
  { name: "Filing Cabinets", description: "Stay organized with our versatile filing cabinets, available in various sizes and styles for home, office.", image: "/home/card/card-2.png", categoryId: 11 },
  { name: "Burglary Safes", description: "Protect your valuables with our robust burglary safes, designed to resist tampering and break-ins.", image: "/home/card/card-3.png", categoryId: 13 },
  { name: "Premium Safes", description: "Experience top-tier protection and style with our Premium Luxury Fire Safes. Combining advanced fire resistance with elegant design, these safes offer customizable interiors, exquisite finishes, and cutting-edge locking systems for safeguarding valuable assets and documents.", image: "/home/card/card-4.png", categoryId: 14 },
  { name: "Vault Doors", description: "Secure your valuables with our premium Vault Doors, featuring advanced locks and heavy-duty construction for maximum protection.", image: "/home/card/card-5.png", categoryId: 15 },
  { name: "Mobile Shelving System", description: "Maximize storage efficiency with our Mobile Shelving Systems, featuring rolling shelves that move smoothly along tracks.", image: "/home/card/card-6.jpg", categoryId: 16 },
  { name: "Paper Shredders, Laminating and Binding machines.", description: "Securely protect your confidential information with our efficient paper shredders, designed to transform sensitive documents into unreadable particles.", image: "/home/card/card-7.png", categoryId: 17 },
  { name: "Currency Counting Machines", description: "Streamline your cash handling with our advanced currency counting machines, designed for rapid, accurate, and error-free processing of banknotes.", image: "/home/card/card-8.png", categoryId: 10 },
  { name: "Flip charts and White Boards", description: "Capture ideas and inspire creativity with our versatile flip charts, designed to enhance brainstorming sessions and presentations with ease and clarity.", image: "/home/card/card-10.jpg", categoryId: 1 },
  { name: "Interactive Displays", description: "Elevate your presentations and engagements with our interactive displays, designed to deliver an immersive, touch-responsive experience that captivates and connects with your audience.", image: "/home/card/card-9.png", categoryId: 18 },
  { name: "Furniture", description: "Elevate your workspace with our stylish and functional office furniture, crafted to enhance comfort and productivity. From ergonomic chairs to versatile desks, our collection combines quality and design to create a workspace that works for you.", image: "/home/card/card-11.png", categoryId: 19 },
  { name: "Other Security Products", description: "Explore our diverse selection of miscellaneous security items, designed to enhance safety and protect your assets. From advanced surveillance tools to secure access solutions, we provide the essential components to fortify your security strategy.", image: "/home/card/others.png", categoryId: 20 },
];

export default function CategoryCard() {


  const setCategoryId = useCategoryStore((state) => state.setCategoryId);

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId); 
  };


  return (
    <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 gap-5">
      {categories.map((category) => (
        <div key={category.categoryId} className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(/img/categories/bg/bg2.png)` }}>
          <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
            <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
           <Link 
                href={`/store?category=${createSlug(category.name)}`}
                onClick={() => handleCategoryClick(category.categoryId)}
              >
                {category.name}
           </Link>
            </div>
            <div className="text-justify flex text-sm">
              {category.description}
            </div>
          </div>
          <div className="text-center justify-center flex">
            <img src={category.image} className="object-contain h-56 md:h-64 lg:h-56 absolute bottom-3" alt={category.name} />
          </div>
          <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
            <div className="flex justify-center">
            <Link
                href={`/store?category=${createSlug(category.name)}`}
                onClick={() => handleCategoryClick(category.categoryId)}
                className="h-10 w-40 z-0 font-semibold bg-blue text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white bg-blue-500 hover:bg-blue-600 transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
