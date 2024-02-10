import { useState } from "react";
import Button from "../order/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";

function CreateUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateName(username));
    navigate("/menu");
  }
  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-stone-600 text-sm md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-72 mb-8 input"
      />
      {username !== "" && (
        <div>
          <Button type="primary">Start Ordering</Button>
        </div>
      )}
    </form>
  );
}
export default CreateUser;
