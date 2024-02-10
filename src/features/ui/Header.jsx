import { Link } from "react-router-dom";
import SearchOrder from "../order/SearchOrder";
import Username from "../user/Username";

function Header() {
  return (
    <header className="bg-yellow-500 flex items-center justify-between uppercase py-3 px-4 border-b border-stone-300 max-[640px]:text-xs  ">
      <Link to="/" className="tracking-widest ">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
export default Header;
