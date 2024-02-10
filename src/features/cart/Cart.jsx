/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import Button from "../order/Button";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  function handleOrder() {
    navigate("/order/new");
  }

  return (
    <div className="py-4 px-4">
      <Link
        to="/menu"
        className="text-blue-500 text-sm hover:underline hover:text-blue-700"
      >
        &larr; Back to menu
      </Link>
      <h2 className="font-semibold text-xl mt-6">Your cart, {username}</h2>
      <ul className="divide-y divide-stone-200 border-b mt-3">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-5 space-x-3">
        <Button type="primary" onClick={handleOrder}>
          {" "}
          Order Pizzas
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}
export default Cart;
