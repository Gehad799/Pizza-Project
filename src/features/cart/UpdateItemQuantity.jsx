/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { increaseItemQuantinty, decreaseItemQuantinty } from "./cartSlice";
import Button from "../order/Button";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2 items-center">
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantinty(pizzaId))}
      >
        +
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantinty(pizzaId))}
      >
        -
      </Button>
    </div>
  );
}
export default UpdateItemQuantity;
