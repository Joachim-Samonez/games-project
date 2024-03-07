import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateReview() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: "",
    review: "",
    pc: false,
    playstation: false,
    xbox: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
  const [showReviewsError, setShowReviewsError] = useState(false);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 2) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 1 image per review");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.type === "text" || e.target.type === "textarea") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
    if (
      e.target.id === "pc" ||
      e.target.id === "playstation" ||
      e.target.id === "xbox"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload an image");
      setLoading(true);
      setError(false);
      const res = await fetch("/server/review/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
          author: currentUser.username,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/review/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleShowReviews = async () => {
      try {
        setShowReviewsError(false);
        const res = await fetch(`/server/user/reviews/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowReviewsError(true);
          return;
        }
        setUserReviews(data);
      } catch (error) {
        setShowReviewsError(true);
      }
    };

    handleShowReviews();
  });

  const handleReviewDelete = async (listingId) => {
    try {
      const res = await fetch(`/server/review/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserReviews((prev) =>
        prev.filter((review) => review._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Review a Game</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="title"
            placeholder="Title"
            maxLength="60"
            minLength="2"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.title}
            required
          />
          <textarea
            rows="8"
            type="text"
            id="review"
            placeholder="Review"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.review}
            required
          />
          <div className="flex gap-6 flex-wrap">
            <p>Available on:</p>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="pc"
                className="w-5"
                onChange={handleChange}
                checked={formData.pc}
              />
              <span>PC</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="playstation"
                className="w-5"
                onChange={handleChange}
                checked={formData.playstation}
              />
              <span>PlayStation</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="xbox"
                className="w-5"
                onChange={handleChange}
                checked={formData.xbox}
              />
              <span>Xbox</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Select cover:
            <span className="font-normal text-gray-700 ml-2">
              You can only upload one image
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading" : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg hover:opacity-75"
                >
                  DELETE
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Uploading" : "UPLOAD REVIEW"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>

      <hr className="my-4" />
      <h1 className="text-3xl font-semibold text-center my-7">Your Reviews</h1>
      {userReviews && userReviews.length === 0 && (
        <p className="text-red-700 mt-5 text-center">
          You have no reviews yet!
        </p>
      )}
      <div className="p-1 max-w-2xl mx-auto">
        {userReviews && userReviews.length > 0 && (
          <div className="flex flex-col gap-4">
            {userReviews.map((review) => (
              <div
                key={review._id}
                className="border rounded-lg p-3 flex justify-between items-center gap-4"
              >
                <Link to={`/review/${review._id}`}>
                  <img
                    src={review.imageUrls[0]}
                    className="h-16 w-16 object-contain"
                  />
                </Link>
                <Link
                  to={`/review/${review._id}`}
                  className="text-slate-700 font-semibold hover:underline truncate flex-1"
                >
                  <p>{review.title}</p>
                </Link>
                <div className="flex flex-col item-center">
                  <button
                    onClick={() => handleReviewDelete(review._id)}
                    className="text-red-700"
                  >
                    DELETE
                  </button>
                  <Link to={`/update-review/${review._id}`}>
                    <button className="text-green-700">EDIT</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="text-red-700 mt-5 text-center">
          {showReviewsError ? "Error displaying reviews" : ""}
        </p>
      </div>
    </main>
  );
}
