import { useSelector } from "react-redux";
import CreateUser from "../user/CreateUser";
import Button from "../order/Button";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 text-center px-4 sm:my-16">
      <h1 className="font-semibold text-xl mb-10">
        The best pizza.
        <br />
        <span className="text-yellow-500 ">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          Continue ordering,{username}
        </Button>
      )}
    </div>
  );
}
export default Home;
