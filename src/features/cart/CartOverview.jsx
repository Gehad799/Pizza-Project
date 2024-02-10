import { Link } from "react-router-dom";
import { formatCurrency } from "../utilities/helpers";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!totalCartQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 uppercase text-stone-200 px-3 py-4 ">
      <p className="font-semibold space-x-4 text-stone-400">
        <span>{totalCartQuantity} Pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}
export default CartOverview;
