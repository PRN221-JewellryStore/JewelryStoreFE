import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Table } from "reactstrap";
import { BannerPath } from "src/components";
import { updateQuatity, removeFromCart } from "src/app/feature/cart/CartSlice";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "src/axios/AxiosClient"; // Thêm axiosClient để gọi API

export const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.carts);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState('');

  useEffect(() => {
    // Lấy danh sách voucher
    axiosClient.get('/Promotion/getall')
      .then(response => {
        setVouchers(response);
      })
      .catch(error => {
        console.error('Error fetching vouchers:', error);
      });
  }, []);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const renderCartRow = () => {
    const data = [];
    for (const productId in carts) {
      const { product, quantity } = carts[productId];
      data.push(
        <tr key={productId} className="border-b">
          <td className="w-40 py-4">
            <img className="w-36 h-24 object-cover" src={product.imgUrl} alt={product.name} />
          </td>
          <td className="py-4">{product.name}</td>
          <td className="py-4">{product.cost}$</td>
          <td className="w-24 py-4">
            <Input
              type="number"
              value={quantity}
              onChange={(e) => {
                dispatch(
                  updateQuatity({
                    productId: product.id,
                    quantity: e.target.value,
                  })
                );
              }}
              className="w-full border rounded py-1 px-2"
            />
          </td>
          <td className="py-4">${product.cost * quantity}</td>
          <td className="py-4">
            <Button color="danger" onClick={() => handleRemoveFromCart(productId)}>Remove</Button>
          </td>
        </tr>
      );
    }
    return data;
  };

  const handleCheckout = () => {
    localStorage.setItem('selectedVoucher', selectedVoucher);
    localStorage.setItem('cart', JSON.stringify(carts));
    navigate("/checkout");
  };

  if (Object.keys(carts).length === 0) {
    return (
      <>
        <BannerPath title="Shopping Cart" path="Home - Shopping Cart" image="src/assets/image/slider-bg.jpg" />
        <div className="py-24 px-5">
          <div className="container mx-auto text-center text-3xl font-bold">
            <h2>Giỏ hàng đang trống</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BannerPath title="Shopping Cart" path="Home - Shopping Cart" image="src/assets/image/slider-bg.jpg" />
      <div className="py-24 px-5">
        <div className="container mx-auto">
          <Table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-5">Product</th>
                <th className="py-5">Name</th>
                <th className="py-5">Price</th>
                <th className="py-5">Quantity</th>
                <th className="py-5">Total</th>
                <th className="py-5">Action</th>
              </tr>
            </thead>
            <tbody>{renderCartRow()}</tbody>
          </Table>
          <div className="mt-4">
            <label>Chọn Voucher: </label>
            <Input
              type="select"
              value={selectedVoucher}
              onChange={(e) => setSelectedVoucher(e.target.value)}
            >
              <option value="">Chọn voucher</option>
              {vouchers.map(voucher => (
                <option key={voucher.id} value={voucher.id}>
                  {voucher.description} ({voucher.reducedPercent}%)
                </option>
              ))}
            </Input>
          </div>
          <Button
            color="primary"
            outline
            className="float-right mt-4"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};
