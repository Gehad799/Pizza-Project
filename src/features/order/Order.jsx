/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useLoaderData, useFetcher } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../utilities/helpers";
import OrderItem from "./OrderItem";
import { getOrder } from "../services/apiRestaurant";
import UpdateOrder from "./UpdateOrder";
import { useEffect } from "react";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher]
  );
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="py-6 px-4 space-y-8">
      <div className="gap-2 flex items-center justify-between">
        <h2 className="font-semibold text-xl"> Order #{id} Status</h2>

        <div className="space-x-3">
          {priority && (
            <span className="bg-red-400 rounded-full py-1 px-3 uppercase tracking-wide text-red-50 font-semibold">
              Priority
            </span>
          )}
          <span className="bg-green-400 rounded-full py-1 px-3 uppercase tracking-wide text-red-50 font-semibold">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center bg-stone-300 py-5 px-6 flex-wrap">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide-y divide-stone-200 border-b border-stone-200">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
            isLoadingIngredients={fetcher.state === "loading"}
          />
        ))}
      </ul>

      <div className="px-6 py-5 space-y-3 font-medium bg-stone-200">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export function loader({ params }) {
  const order = getOrder(params.orderId);
  return order;
}
export default Order;
