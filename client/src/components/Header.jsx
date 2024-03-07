import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/server/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <header className="bg-black shadow-md p-2">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-white">GamesReview</span>
          </h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/create-review">
            {currentUser && (
              <li className="text-white hover:underline">Reviews</li>
            )}
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <li className="text-white hover:underline">Profile</li>
            ) : (
              <li className="text-white hover:underline">Sign in</li>
            )}
          </Link>
          <Link to="/">
            {currentUser && (
              <li
                onClick={handleSignOut}
                className="text-white hover:underline"
              >
                Sign out
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
