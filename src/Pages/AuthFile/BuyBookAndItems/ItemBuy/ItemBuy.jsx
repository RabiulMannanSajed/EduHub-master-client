import useDevicecs from "../../../../hooks/useDevicecs";
import BooksBuyAndSell from "../../BooksBuyAndSell/BooksBuyAndSell";

const ItemBuy = () => {
  const [sells, refetch] = useDevicecs();

  return (
    <div className="w-[80%] mx-auto mt-10">
      <BooksBuyAndSell />
      <h2 className="text-2xl font-bold mb-6">Available Devices</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sells?.data?.map((device) => (
          <div
            key={device._id}
            className="bg-white shadow-md rounded-xl overflow-hidden p-4 flex flex-col justify-between"
          >
            <img
              src={device.imageURL}
              alt={device.title}
              className="w-full h-40 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-1">{device.title}</h3>
            <p className="text-gray-600 mb-1">Brand: {device.authorOrBrand}</p>
            <p className="text-gray-600 mb-1">Condition: {device.condition}</p>
            <p className="text-lg font-bold mb-3">Price: ${device.price}</p>
            <button className="bg-[#f08e40] text-white px-4 py-2 rounded-lg hover:bg-[#f18e21] transition">
              Buy This Device
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemBuy;
