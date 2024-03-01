import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
          <h1>{review.name}</h1>
          {review.imageUrls.map((url) => (
            <div key={url} className="h-[550px]">
              {{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
