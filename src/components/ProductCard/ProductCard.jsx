import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { addToCart } from "src/app/feature/cart/CartSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToDetailPage = () => {
    navigate(`/product-detail/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Thêm hàng thành công!");
  };

  return (
    <Card className="border-0 mb-8 text-center cursor-pointer" onClick={goToDetailPage}>
      <div className="relative overflow-hidden group">
        <img 
          alt="Product" 
          src={product.imgUrl} 
          className="w-full h-[310px] object-cover" 
        />
        <div
          className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-lg p-5 text-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          onClick={handleAddToCart}
        >
          Add to cart
        </div>
      </div>
      <CardBody>
        <h4 className="text-lg font-semibold">
          <a href="single-product.html" className="text-blue-600 hover:underline">{product.name}</a>
        </h4>
        <p className="text-md font-medium">${product.cost}</p>
      </CardBody>
    </Card>
  );
};
