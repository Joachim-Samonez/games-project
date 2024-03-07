import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiComputerFill, RiPlaystationLine, RiXboxFill } from "react-icons/ri";

export default function Review() {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/server/review/get/${params.reviewId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setReview(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchReview();
  }, [params.reviewId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {review && !loading && !error && (
        <div>
          {review.imageUrls.map((url) => (
            <div
              key={url}
              className="h-[400px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          ))}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-4xl font-bold">{review.title}</p>
            <ul className="font-thin text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li>Reviewed by: {review.author}</li>
              <li> | </li>
              {review.createdAt !== review.updatedAt && (
                <ul className="font-thin text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                  <li>
                    Updated:{" "}
                    {new Date(review.updatedAt).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      timeZone: "Asia/Manila",
                    })}
                  </li>
                  <li> | </li>
                </ul>
              )}
              <li>
                Posted:{" "}
                {new Date(review.createdAt).toLocaleDateString("en-PH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  timeZone: "Asia/Manila",
                })}
              </li>
            </ul>
            <hr />
            <p className="text-slate-800">
              <span className="font-semibold text-black" />
              {review.review}
            </p>
            <ul className="text font-thin text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <p>Available on:</p>
              <li className="flex items-center gap-4 whitespace-nowrap ">
                {review.pc ? <RiComputerFill size="30px" color="black" /> : ""}
                {review.playstation ? (
                  <RiPlaystationLine size="30px" color="black" />
                ) : (
                  ""
                )}
                {review.xbox ? <RiXboxFill size="30px" color="black" /> : ""}
              </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
