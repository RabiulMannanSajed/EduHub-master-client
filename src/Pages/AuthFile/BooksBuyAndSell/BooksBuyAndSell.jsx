import { useState } from "react";
import { useForm } from "react-hook-form";

const BooksBuyAndSell = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // You can handle the file (data.image[0]) and other info here.
    setIsModalOpen(false);
    reset();
  };

  return (
    <div>
      <div className="w-[80%] mx-auto">
        <div
          className="bg-amber-500 w-[130px] m-5 rounded-md cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <p className="text-center pl-5 pr-5 pt-2 pb-2 font-bold">Sell Post</p>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
              <button
                className="absolute top-2 right-3 text-xl font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Post Your Book</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <input
                  type="text"
                  placeholder="Title"
                  {...register("title", { required: true })}
                  className="w-full border p-2 rounded"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">Title is required</p>
                )}

                <input
                  type="text"
                  placeholder="Author"
                  {...register("author", { required: true })}
                  className="w-full border p-2 rounded"
                />
                {errors.author && (
                  <p className="text-red-500 text-sm">Author is required</p>
                )}

                <input
                  type="number"
                  placeholder="Price"
                  {...register("price", { required: true })}
                  className="w-full border p-2 rounded"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">Price is required</p>
                )}

                <select
                  {...register("condition", { required: true })}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Used">Used</option>
                </select>
                {errors.condition && (
                  <p className="text-red-500 text-sm">Condition is required</p>
                )}

                <select
                  {...register("itemType", { required: true })}
                  className="w-full border p-2 rounded"
                >
                  <option value="Book">Book</option>
                  <option value="Device">Device</option>
                </select>

                {errors.condition && (
                  <p className="text-red-500 text-sm">Type is required</p>
                )}

                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: true })}
                  className="w-full"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">Image is required</p>
                )}

                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-[100px] h-auto rounded border object-cover"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white p-2 rounded font-semibold"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        )}
        <div>
          <p>here all books</p>
        </div>
      </div>

      {/* Modal */}
    </div>
  );
};

export default BooksBuyAndSell;
