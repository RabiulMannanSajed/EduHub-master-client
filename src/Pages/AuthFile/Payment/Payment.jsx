const Payment = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Checkout
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Billing Address
          </h3>
          <form className="space-y-4">
            <div>
              <label
                for="fullName"
                className="block text-sm font-semibold text-gray-600"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label
                for="email"
                className="block text-sm font-semibold text-gray-600"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label
                for="address"
                className="block text-sm font-semibold text-gray-600"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="city"
                  className="block text-sm font-semibold text-gray-600"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="City"
                  className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label
                  for="zipCode"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  placeholder="Zip Code"
                  className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Shipping Address
          </h3>
          <form className="space-y-4">
            <div>
              <label
                for="shippingName"
                className="block text-sm font-semibold text-gray-600"
              >
                Full Name
              </label>
              <input
                type="text"
                id="shippingName"
                placeholder="Enter recipient's full name"
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label
                for="shippingAddress"
                className="block text-sm font-semibold text-gray-600"
              >
                Address
              </label>
              <input
                type="text"
                id="shippingAddress"
                placeholder="Enter shipping address"
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="shippingCity"
                  className="block text-sm font-semibold text-gray-600"
                >
                  City
                </label>
                <input
                  type="text"
                  id="shippingCity"
                  placeholder="Shipping City"
                  className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label
                  for="shippingZip"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="shippingZip"
                  placeholder="Shipping Zip Code"
                  className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between text-gray-800">
            <span>Product 1</span>
            <span>$49.99</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <div className="flex justify-between text-gray-800 font-semibold">
            <span>Total</span>
            <span>$54.99</span>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Payment Method
        </h3>
        <form className="space-y-4">
          <div>
            <label
              for="cardNumber"
              className="block text-sm font-semibold text-gray-600"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="Enter your card number"
              className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                for="expiryDate"
                className="block text-sm font-semibold text-gray-600"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                placeholder="MM/YY"
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label
                for="cvv"
                className="block text-sm font-semibold text-gray-600"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                placeholder="CVV"
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>
        </form>
      </div>

      <div className="mt-8 text-center">
        <button className="bg-green-600 text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
          Complete Purchase
        </button>
      </div>
    </div>
  );
};

export default Payment;
