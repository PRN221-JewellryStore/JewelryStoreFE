import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Table } from "reactstrap";
import { BannerPath } from "src/components";
import { updateQuatity } from "src/app/feature/cart/CartSlice";
import { useNavigate } from "react-router-dom";
import imageUrl from "src/assets/image/o2.jpg";

export const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.carts);

  const renderCartRow = () => {
    const data = [];
    for (const productId in carts) {
      const { product, quantity } = carts[productId];
      data.push(
        <tr key={productId} className="border-b">
          <td className="w-40 py-4">
            <img className="w-36 h-24 object-cover" src={imageUrl} alt={product.name} />
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
        </tr>
      );
    }
    return data;
  };

  return (
    <>
      <BannerPath title="Shopping Cart" path="Home - Shopping Cart" />
      <div className="py-24 px-5">
        <div className="container mx-auto">
          <Table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-4">Product</th>
                <th className="py-4">Name</th>
                <th className="py-4">Price</th>
                <th className="py-4">Quantity</th>
                <th className="py-4">Total</th>
              </tr>
            </thead>
            <tbody>{renderCartRow()}</tbody>
          </Table>
          <Button
            color="primary"
            outline
            className="float-right mt-4"
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};
