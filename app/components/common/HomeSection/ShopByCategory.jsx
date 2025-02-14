"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const ShopByCategory = () => {
  const [activeCategory, setActiveCategory] = useState("Nutra Supplements");
  const sliderRef = useRef(null);

  const categories = [
    {
      name: "Nutra Supplements",
      icon: "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
    },
    {
      name: "Personal Care",
      icon: "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
    },
    {
      name: "Herbal",
      icon: "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
    },
    {
      name: "Dr. Vet",
      icon: "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
    },
    {
      name: "Mother & Child Care",
      icon: "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
    },
    {
      name: "Combo",
      icon: "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
    },
  ];
  const products = {
    "Nutra Supplements": [
      {
        name: "DERM EASE Mark Less Cream",
        price: 112,
        originalPrice: 139,
        image:
          "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
      },
      {
        name: "YAXON CARTHEAL SHOT Syrup",
        price: 85,
        originalPrice: 95,
        image: "/assets/images/product2.png",
      },
      {
        name: "DERM EASE Mark Less Cream",
        price: 112,
        originalPrice: 139,
        image:
          "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
      },
      {
        name: "YAXON CARTHEAL SHOT Syrup",
        price: 85,
        originalPrice: 95,
        image: "/assets/images/product2.png",
      },
      {
        name: "DERM EASE Mark Less Cream",
        price: 112,
        originalPrice: 139,
        image:
          "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
      },
      {
        name: "YAXON CARTHEAL SHOT Syrup",
        price: 85,
        originalPrice: 95,
        image: "/assets/images/product2.png",
      },
      {
        name: "DERM EASE Mark Less Cream",
        price: 112,
        originalPrice: 139,
        image:
          "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
      },
      {
        name: "YAXON CARTHEAL SHOT Syrup",
        price: 85,
        originalPrice: 95,
        image: "/assets/images/product2.png",
      },
      {
        name: "DERM EASE Mark Less Cream",
        price: 112,
        originalPrice: 139,
        image:
          "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
      },
      {
        name: "YAXON CARTHEAL SHOT Syrup",
        price: 85,
        originalPrice: 95,
        image: "/assets/images/product2.png",
      },
      {
        name: "DERM EASE Mark Less Cream",
        price: 112,
        originalPrice: 139,
        image:
          "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
      },
      {
        name: "YAXON CARTHEAL SHOT Syrup",
        price: 85,
        originalPrice: 95,
        image: "/assets/images/product2.png",
      },
      {
        name: "DERM EASE Mark Less Cream",
        price: 112,
        originalPrice: 139,
        image:
          "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
      },
      {
        name: "YAXON CARTHEAL SHOT Syrup",
        price: 85,
        originalPrice: 95,
        image: "/assets/images/product2.png",
      },
      {
        name: "DERM EASE Mark Less Cream",
        price: 112,
        originalPrice: 139,
        image:
          "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
      },
      {
        name: "YAXON CARTHEAL SHOT Syrup",
        price: 85,
        originalPrice: 95,
        image: "/assets/images/product2.png",
      },
      {
        name: "DERM EASE Mark Less Cream",
        price: 112,
        originalPrice: 139,
        image:
          "https://yaxoncare.com/uploads/category/1614759533_nutraceuticals.png",
      },
      {
        name: "YAXON CARTHEAL SHOT Syrup",
        price: 85,
        originalPrice: 95,
        image: "/assets/images/product2.png",
      },
    ],
    "Personal Care": [
      {
        name: "YAXON VITAXON Drops",
        price: 50,
        originalPrice: 58,
        image: "/assets/images/product3.png",
      },
      {
        name: "YAXON YAXOFER XT Drops",
        price: 50,
        originalPrice: 55,
        image: "/assets/images/product4.png",
      },
    ],
    // Add more categories with products here
  };

  useEffect(() => {
    if (sliderRef.current) {
      // GSAP Animation for the slider
      gsap.fromTo(
        sliderRef.current.children,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [activeCategory]);

  return (
    <div className="bg-gray-100 py-8 ">
      {/* Categories */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Shop by Categories
        </h2>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-lg shadow-md nav-item ${
                  activeCategory === category.name
                    ? "bg-green-500 text-white"
                    : "bg-white border border-gray-300"
                } transition hover:bg-green-500 hover:text-white`}
                onClick={() => setActiveCategory(category.name)}
              >
                {/* Icon */}
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-6 h-6"
                />
                {/* Category Name */}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Slider */}
      <div className="container mx-auto px-4 ">
        <div
          ref={sliderRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products[activeCategory]?.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 text-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="text-green-600 font-bold text-lg">
                Rs. {product.price}{" "}
                <span className="line-through text-gray-500 text-sm">
                  Rs. {product.originalPrice}
                </span>
              </div>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
