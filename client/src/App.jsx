import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import CreateReview from "./pages/CreateReview";
import Review from "./pages/Review";
import UpdateReview from "./pages/UpdateReview";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/review/:reviewId" element={<Review />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-review" element={<CreateReview />} />
          <Route path="/update-review/:reviewId" element={<UpdateReview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
