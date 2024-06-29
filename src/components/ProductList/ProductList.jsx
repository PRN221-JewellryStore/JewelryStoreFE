import React from "react";

const ProductList = ({
  description,
  title,
  name,
  products,
  ...args
}) => {
  return (
    <div className="product-list bg-gray-100 py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="product-list__intro mb-12">
          <p className="text-center">{description}</p>
          <h2 className="text-3xl font-bold text-center mb-4">
            {title}{" "}
            <span className="product-list__intro__style border-b-2 border-blue-500 pb-1">
              {name}
            </span>
          </h2>
        </div>
        <ProductList products={products} {...args} />
      </div>
    </div>
  );
};

export default ProductList;
