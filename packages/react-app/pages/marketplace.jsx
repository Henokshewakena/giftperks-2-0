"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

// import { useContractCall } from "@/hooks/contract/useContractRead";

// Import the Product and Alert components
import Product from "@/components/Product";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import LoadingAlert from "@/components/alerts/LoadingAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (type) => {
    setSortType(type);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //   const filteredProducts = products
  //     .filter((product) =>
  //       product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //     .sort((a, b) => {
  //       if (sortType === "price") {
  //         return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  //       } else {
  //         return sortOrder === "asc"
  //           ? a.name.localeCompare(b.name)
  //           : b.name.localeCompare(a.name);
  //       }
  //     });

  // Use the useContractCall hook to read how many products are in the marketplace contract
  //   const { data } = useContractCall("getProductsLength", [], true);
  // Convert the data to a number
  const productLength =
    //    data ? Number(data.toString())
    0;
  // Define the states to store the error, success and loading messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  // Define a function to clear the error, success and loading states
  const clear = () => {
    setError("");
    setSuccess("");
    setLoading("");
  };
  // Define a function to return the products
  const getProducts = () => {
    // If there are no products, return null
    if (!productLength) return null;
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
    ];
    // Loop through the products, return the Product component and push it to the products array
    for (let i = 0; i < productLength; i++) {
      products.push(
        <Product
          key={i}
          id={i}
          setSuccess={setSuccess}
          setError={setError}
          setLoading={setLoading}
          loading={loading}
          clear={clear}
        />
      );
    }
    return products;
  };

  return (
    <div className="md:h-screen md:w-full flex flex-row mt-2">
      {/* If there is an alert, display it */}
      {error && <ErrorAlert message={error} clear={clear} />}
      {success && <SuccessAlert message={success} />}
      {loading && <LoadingAlert message={loading} />}
      {/* Display the products */}
      <div className="min-h-min md:w-1/4 md:p-4 fixed">
        <div className="md:mb-4 md:mr-20 bg-grey">
          <label className="block mb-2">Sort By:</label>
          <button onClick={() => handleSort("price")} className="block mb-2">
            Price
          </button>
          <button onClick={() => handleSort("name")} className="block mb-2">
            Type
          </button>
        </div>
      </div>
      <div className="w-3/4 flex flex-col ml-20  md:p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="block md:w-full w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Loop through the products and return the Product component */}
          {getProducts()}
          {/* {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-orange-500 p-4 rounded-2xl shadow-sm"
            >
              <h2 className="text-lg font-bold">{product.name}</h2>
              <Image src={product.img} width={150} height={170} />
              <p>{product.description}</p>
              <p className="text-xl font-bold mb-2">${product.price}</p>
              {product.discount && (
                <p className="text-orange-500">{product.discount}</p>
              )}

              <button
                type="button"
                onClick={connectWallet}
                className="border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-3xl py-2 px-6 text-[12px] text-white"
              >
                Purchase
              </button>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
