import React from "react";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: "$100",
    img: "/assets/images/gift-box.png",
    description: "Description of product 1",
  },
  {
    id: 2,
    name: "Product 2",
    price: "$150",
    img: "/assets/images/gift-box.png",
    description: "Description of product 2",
  },
  {
    id: 3,
    name: "Product 3",
    price: "$200",
    img: "/assets/images/gift-box.png",
    description: "Description of product 3",
  },
  // Add more products here
];

const UserProductsPage = () => {
  return (
    <div className="h-screen p-6">
      <h1 className="orange_gradient text-3xl font-bold mb-6">My Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-orange-500 p-4 rounded-2xl shadow-sm"
          >
            <h2 className="text-lg font-bold">{product.name}</h2>
            <Image src={product.img} width={150} height={170} />
            <p>{product.description}</p>
            <p className="text-xl font-bold">${product.price}</p>
            {product.discount && (
              <p className="text-orange-500">{product.discount}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProductsPage;
