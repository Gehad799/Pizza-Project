import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Button({ children, type, onClick, disabled, to }) {
  const base =
    "text-sm bg-yellow-500 font-semibold text-stone-700 rounded-full uppercase tracking-wide focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2  disabled:cursor-not-allowed hover:bg-yellow-300  ";

  const styles = {
    primary: base + "px-4 py-3 md:py-4 md:px-6",
    small: base + "px-4 py-2 text-xs md:px-5 md:py-2.5",
    round: base + "text-xs py-1 px-2 md:px-3 md:py-2",
    secondary:
      "text-sm bg-stone-100 font-semibold text-stone-400 rounded-full uppercase tracking-wide focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2  disabled:cursor-not-allowed hover:bg-stone-300 px-4 py-3 md:py-4 md:px-6  border border-stone-400",
  };
  if (to)
    return (
      <Link disabled={disabled} className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
export default Button;
