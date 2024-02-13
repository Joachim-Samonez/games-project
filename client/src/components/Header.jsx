import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-white">GamesReview</span>
          </h1>
        </Link>
        <form className="bg-white p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-black" />
        </form>
        <ul className="flex gap-4">
          <Link to="/about">
            <li className="text-white hover:underline">About</li>
          </Link>
          <Link to="/sign-in">
            <li className="text-white hover:underline">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
