import { useEffect, useState } from "react";
import ReviewItem from "../components/ReviewItem";

export default function Home() {
  const [authorPicks, setAuthorPicks] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {
    const fetchTopReviews = async () => {
      try {
        const res = await fetch(
          "/server/review/get?author=Joachim Samoñez&limit=3"
        );
        const data = await res.json();
        setAuthorPicks(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRecentReviews = async () => {
      try {
        const res = await fetch("/server/review/get?pc=true&limit=6");
        const data = await res.json();
        setRecentReviews(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentReviews();
    fetchTopReviews();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-12 px-3 max-w-6xl mx-auto">
        <h1 className="font-bold text-3xl lg:text-6xl">
          Built for <span>Gamers</span> <br /> by a <span>Gamer</span>
        </h1>
        <div className="font-extralight text-xs sm:text-sm">
          Games Review is built by Joachim Samoñez to be your #1 destination for
          &quot;expert&quot; reviews
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col">
        {authorPicks && authorPicks.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Author Picks
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {authorPicks.map((review) => (
                <ReviewItem review={review} key={review._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col">
        {recentReviews && recentReviews.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Reviews
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {recentReviews.map((review) => (
                <ReviewItem review={review} key={review._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
