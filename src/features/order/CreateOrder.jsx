/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useSelector } from "react-redux";
import Button from "./Button";
import { Form, redirect } from "react-router-dom";
import EmptyCart from "../cart/EmptyCart";
import { createOrder } from "../services/apiRestaurant";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import { useNavigation } from "react-router-dom";
import { useState } from "react";
import { formatCurrency } from "../utilities/helpers";
import { useActionData } from "react-router-dom";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );
function CreateOrder() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  const [withPriority, setWithPriority] = useState(false);
  const formErrors = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? let's go!</h2>
      <Form action="/order/new" method="POST">
        <div className="mb-5 flex flex-col  gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>
        <div className="mb-5 flex flex-col  gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone Number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full " />
            {formErrors?.phone && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="mb-5 flex flex-col  gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <input type="text" name="address" required className="input grow" />
        </div>
        <div className="mb-12 flex gap-5 items-center ">
          <input
            className="focus:outline-none focus:ring focus:ring-yellow-400  focus:ring-offset-2 h-6 w-6 accent-yellow-400 "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          {/* so that form could access cart items*/}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        </div>
        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order ..."
              : `Order Now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number, We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  //if everything is okay, createnew  order and redirect
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  // return redirect("/order/IIDSAT");
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
