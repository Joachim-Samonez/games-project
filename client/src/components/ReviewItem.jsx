import { Link } from "react-router-dom";

export default function ReviewItem({ review }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/review/${review._id}`}>
        <img
          src={review.imageUrls}
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {review.title}
          </p>
          <div className="flex items-center gap-1">
            <p className="text-sm text-gray-600 truncate w-full">
              by: {review.author}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {review.review}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
