/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { updateOrder } from "../services/apiRestaurant";
import Button from "./Button";
import { useFetcher } from "react-router-dom";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  return (
    // use fetcher here cause we don't want navigation
    <fetcher.Form method="PATCH">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}
export default UpdateOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
