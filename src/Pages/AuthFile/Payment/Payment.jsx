import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../CustomProvider/userContext";
import useBloodDonors from "../../../hooks/useBloodDonners";
import { useLocation } from "react-router";

const Payment = () => {
  const location = useLocation();
  const { title, price, imageURL, sellerId } = location.state || {};
  console.log(title, price, imageURL, sellerId);
  const { userEmail } = useUser();
  const [users] = useBloodDonors(); // get the data array from the object
  const [currentUser, setCurrentUser] = useState(null);
  const numericPrice = parseFloat(price);

  // Calculate total
  const total = numericPrice + 5;

  // Convert total to string
  const totalString = total.toString();
  useEffect(() => {
    if (userEmail && users?.data?.length > 0) {
      const foundUser = users.data.find((user) => user?.email === userEmail);
      setCurrentUser(foundUser || null);
    }
  }, [userEmail, users]);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      buyerId: currentUser._id,
      sellerId: sellerId,
      billingAddress: {
        fullName: data.billingFullName,
        email: data.billingEmail,
        address: data.billingAddress,
        city: data.billingCity,
        zip: data.billingZip,
      },
      shippingAddress: {
        fullName: data.shippingFullName,
        address: data.shippingAddress,
        city: data.shippingCity,
        zip: data.shippingZip,
      },
      payment: {
        cardNumber: data.cardNumber,
        expiryDate: data.expiryDate,
        cvv: data.cvv,
      },
      orderSummary: {
        items: [
          { name: title, price: price },
          { name: "Shipping", price: "5.0" },
        ],
        shippingCost: 5.0,
        totalAmount: totalString,
      },
    };
    console.log(payload);
    // Send to backend
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/orders/create-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Purchase completed successfully!");
        reset();
      } else {
        const error = await response.json();
        console.error("Server error:", error);
        alert("Failed to complete purchase.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10"
    >
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Checkout
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Address */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Billing Address
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Full Name
              </label>
              <input
                {...register("billingFullName", {
                  required: "Full name is required",
                })}
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 border rounded-md border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Email Address
              </label>
              <input
                {...register("billingEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter your email address"
                className="w-full p-3 border rounded-md border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Address
              </label>
              <input
                {...register("billingAddress", {
                  required: "Address is required",
                })}
                type="text"
                placeholder="Enter your address"
                className="w-full p-3 border rounded-md border-gray-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  City
                </label>
                <input
                  {...register("billingCity", { required: "City is required" })}
                  type="text"
                  placeholder="City"
                  className="w-full p-3 border rounded-md border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Zip Code
                </label>
                <input
                  {...register("billingZip", {
                    required: "Zip code is required",
                  })}
                  type="text"
                  placeholder="Zip Code"
                  className="w-full p-3 border rounded-md border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Shipping Address
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Full Name
              </label>
              <input
                {...register("shippingFullName", {
                  required: "Full name is required",
                })}
                type="text"
                placeholder="Enter recipient's full name"
                className="w-full p-3 border rounded-md border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Address
              </label>
              <input
                {...register("shippingAddress", {
                  required: "Address is required",
                })}
                type="text"
                placeholder="Enter shipping address"
                className="w-full p-3 border rounded-md border-gray-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  City
                </label>
                <input
                  {...register("shippingCity", {
                    required: "City is required",
                  })}
                  type="text"
                  placeholder="Shipping City"
                  className="w-full p-3 border rounded-md border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Zip Code
                </label>
                <input
                  {...register("shippingZip", {
                    required: "Zip code is required",
                  })}
                  type="text"
                  placeholder="Shipping Zip Code"
                  className="w-full p-3 border rounded-md border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between text-gray-800">
            <span>{title}</span>
            <span>$ {price}</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <div className="flex justify-between text-gray-800 font-semibold">
            <span>Total</span>
            <span>$ {totalString}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Payment Method
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Card Number
            </label>
            <input
              {...register("cardNumber", {
                required: "Card number is required",
              })}
              type="text"
              placeholder="Enter your card number"
              className="w-full p-3 border rounded-md border-gray-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Expiry Date
              </label>
              <input
                {...register("expiryDate", {
                  required: "Expiry date is required",
                })}
                type="text"
                placeholder="MM/YY"
                className="w-full p-3 border rounded-md border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                CVV
              </label>
              <input
                {...register("cvv", { required: "CVV is required" })}
                type="text"
                placeholder="CVV"
                className="w-full p-3 border rounded-md border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          className="bg-green-600 text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-green-700"
        >
          Complete Purchase
        </button>
      </div>
    </form>
  );
};

export default Payment;
