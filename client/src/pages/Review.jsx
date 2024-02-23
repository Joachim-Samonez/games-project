export default function Review() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Review a Game</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="title"
            placeholder="Title"
            maxLength="60"
            minLength="10"
            className="border p-3 rounded-lg"
            required
          />
          <textarea
            type="text"
            id="review"
            placeholder="Review"
            className="border p-3 rounded-lg"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="pc" className="w-5" />
              <span>PC</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="playstation" className="w-5" />
              <span>PlayStation</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="xbox" className="w-5" />
              <span>Xbox</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="switch" className="w-5" />
              <span>Switch</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-700 ml-2">
              The first image will be the cover
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-80">
              UPLOAD
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80">
            SUBMIT REVIEW
          </button>
        </div>
      </form>
    </main>
  );
}
