import { useEffect, useState } from "react";

export default function Home() {
  const [topReviews, setTopReviews] = useState([]);

  console.log(topReviews);

  useEffect(() => {
    const fetchTopReviews = async () => {
      try {
        const res = await fetch(
          "/server/review/get?author=Joachim Samoñez&limit=3"
        );
        const data = await res.json();
        setTopReviews(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopReviews();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="font-bold text-3xl lg:text-6xl">
          Built for <span>Gamers</span> <br /> by a <span>Gamer</span>
        </h1>
        <div className="font-extralight text-xs sm:text-sm">
          Games Review is built by Joachim Samoñez to be your #1 destination for
          &quot;expert&quot; reviews
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {topReviews && topReviews.length > 0 && (
          <div className="">
            <div className="">
              <h2>Top reviews</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
