import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full py-2 px-4 text-sm placeholder:text-stone-400 bg-yellow-100 w-30 sm:w-64 focus:outline-none
        focus:ring focus:ring-yellow-400
        focus:ring-opacity-50
        transition-all
        duration-300
        sm:focus:w-72
        max-[640px]:w-32
        max-[640px]:placeholder:text-[0.68rem]"
      />
    </form>
  );
}
export default SearchOrder;
