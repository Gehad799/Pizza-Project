/* eslint-disable no-unused-vars */

import { formatCurrency } from "../utilities/helpers";
import Button from "../order/Button";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

/* eslint-disable react/prop-types */
function MenuItem({ pizza }) {
  const { id, name, imageUrl, soldOut, ingredients, unitPrice } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col pt-0.5 grow">
        <p className="font-medium">{name}</p>
        <p className="italic text-sm capitalize text-stone-500">
          {ingredients.join(" , ")}
        </p>
        <div className="flex items-center justify-between mt-auto">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase font-medium text-stone-500">
              Sold out
            </p>
          )}
          {currentQuantity > 0 && (
            <div className="flex gap-2">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !currentQuantity && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}
export default MenuItem;
