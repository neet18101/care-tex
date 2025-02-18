  "use client";
  import { useState, useEffect, useRef } from "react";
  import { gsap } from "gsap";

  const ShopByCategory = () => {
    const [activeCategory, setActiveCategory] = useState("Nutra Supplements");
    const [categories, setCategories] = useState([]);

    const [products, setProducts] = useState({});

    const sliderRef = useRef(null);
    useEffect(() => {
      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => {
          setCategories(data.categories);
          setProducts(data.products);
          setActiveCategory(data.categories[0].name); // Set default category
        })
        .catch((error) => console.error("Error loading data:", error));
    }, []);

    useEffect(() => {
      if (sliderRef.current) {
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

    // Scroll control functions
    const scrollLeft = () => {
      gsap.to(sliderRef.current, { x: "+=300", duration: 0.5 });
    };

    const scrollRight = () => {
      gsap.to(sliderRef.current, { x: "-=300", duration: 0.5 });
    };

    return (
      <div className="bg-gray-100 py-8">
        {/* Categories */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Shop by Categories
          </h2>
          <div className="overflow-x-auto flex justify-center flex gap-4 py-2 px-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg shadow-md ${
                  activeCategory === category.name
                    ? "bg-[#f59f8b] border border-[#e58674] text-white"
                    : "bg-white text-[#70292f]"
                } transition hover:bg-[#e58674] hover:text-white whitespace-nowrap`}
                onClick={() => setActiveCategory(category.name)}
              >
                {/* <img
                  src="https://cdn-icons-png.flaticon.com/512/6177/6177173.png"
                  alt={category.name}
                  className="w-6 h-6"
                /> */}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Slider */}
        <div className="container mx-auto px-4 mt-6 relative">
          {/* Slider Controls */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-lg z-10 hidden md:block"
          >
            ◀
          </button>

          <div className="overflow-x-auto flex justify-center gap-6 py-4 scrollbar-hide">
            <div
              ref={sliderRef}
              className="flex justify-center gap-6 transition-transform duration-500 ease-in-out"
            >
              {products[activeCategory]?.map((product, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-4 text-center border-2 border-[#70292f] rounded-[3px_50px] shadow-[1px_1px_4px_#e58674] w-[250px] md:w-[300px] flex-shrink-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <div className="text-gray-500 font-bold text-lg">
                    Rs. {product.price}
                  </div>
                  <button className="mt-4 px-4 py-2 bg-[#f59f8b] text-white rounded-lg text-sm hover:bg-[#e58674]">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-lg z-10 hidden md:block"
          >
            ▶
          </button>
        </div>
      </div>
    );
  };

  export default ShopByCategory;
