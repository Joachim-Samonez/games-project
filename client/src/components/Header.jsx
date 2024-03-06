import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-black shadow-md p-2">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-white">GamesReview</span>
          </h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/profile">
            {currentUser ? (
              <li className="text-white hover:underline">Profile</li>
            ) : (
              <li className="text-white hover:underline">Sign up</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
