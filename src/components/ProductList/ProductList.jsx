// ProductList.js
import { Col, Row } from "reactstrap";
import { ProductCard } from "../ProductCard/ProductCard";

export const ProductList = ({ products = [], ...args }) => {
  return (
    <div className="flex flex-wrap justify-center gap-10 ml-60">
      {products.map((product) => (
        <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};


