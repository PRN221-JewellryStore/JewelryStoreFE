import React, { useEffect, useState } from "react";
import { Comment } from "src/components";
import { Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { axiosClient } from "src/axios/AxiosClient";
import { useDispatch } from "react-redux";
import { addToCart } from "src/app/feature/cart/CartSlice";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const renderTab = (tab) => {
  switch (tab) {
    case 2:
      return <div>Specifications</div>;
    case 3:
      return <Comment />;
    default:
      return (
        <p>
          {/* Nội dung mô tả sản phẩm */}
        </p>
      );
  }
};

export const ProductDetailPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching product with ID:", productId); // Debugging
        const response = await axiosClient.get(`/Product/${productId}`);
        console.log("API response:", response); // Debugging
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast.success("Thêm hàng thành công!");
  };

  if (!product)
    return (
      <h1 className="mt-32 flex justify-center">
        <Spinner color="primary" className="h-12 w-12">
          Loading...
        </Spinner>
      </h1>
    );

  // Định dạng giá tiền VND
  const formattedPrice = product.cost.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <div className="product-detail-page">
      <div className="container mx-auto py-16">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <img className="img-fluid" src={product.imgUrl} alt={product.name} />
          </div>
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:pl-10">
            <h3 className="text-2xl font-medium text-gray-900 mb-4">
              {product.name}
            </h3>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">
              {formattedPrice}
            </h2>
            <ul className="mb-4">
              <li>
                <span className="text-gray-600">Category</span> :{" "}
                {product.category.name}
              </li>
              <li>
                <span className="text-gray-600">Weight</span> : {product.weight}{" "}
                gram
              </li>
              <li>
                <span className="text-gray-600">Availability</span> :{" "}
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </li>
            </ul>
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="text-gray-700 mr-2">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                size="2"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 w-20"
              />
            </div>
            <Button
              color="primary"
              onClick={handleAddToCart}
              isDisabled={product.quantity === 0}
            >
              Add to Cart
            </Button>
            <div className="flex items-center border-t border-gray-200 pt-4">
              <FontAwesomeIcon
                beat
                size="2x"
                icon={faHeart}
                color="red"
                className="mr-2"
              />
              <div>100k+</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mb-20">
        <div className="mt-20 flex justify-center items-center bg-gray-100 py-3">
          <Button
            outline
            color="primary"
            onClick={() => setActiveTab(1)}
            active={activeTab === 1}
          >
            Description
          </Button>
          <Button
            outline
            color="primary"
            onClick={() => setActiveTab(2)}
            active={activeTab === 2}
            className="ml-4"
          >
            Specification
          </Button>
          <Button
            outline
            color="primary"
            onClick={() => setActiveTab(3)}
            active={activeTab === 3}
            className="ml-4"
          >
            Comments & Review
          </Button>
        </div>
        <div className="border border-gray-200 p-6">{renderTab(activeTab)}</div>
      </div>
    </div>
  );
};
