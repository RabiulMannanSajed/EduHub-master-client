import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import loginImg from "../../../../src/assets/images/login.jpg";
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { error },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        data
      );

      // If the request was successful, it won't go to catch
      alert("Login successful!");
      console.log("Logged in user:", response.data.data.user); // optional
      if (response.data?.data?.user) {
        const { email } = response.data.data.user;
        localStorage.setItem("email", email);
        navigate("/profile"); //
      }
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        alert(
          `Login failed: ${error.response.data.message || "Unknown error"}`
        );
      } else {
        alert("Something went wrong while submitting the form.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="p-10 bg-white flex items-center">
      <div className="flex-1">
        <h1 className="textColor mb-[10%] ">EDU Hub</h1>
        <p className="textColor ml-[65%]">
          <u>Login</u>
        </p>
        <p>Create Your Account To Explore The Wisdom</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-[5%] divOfSignUp">
            <label>Email</label>
            <br />
            <input
              {...register("email", {
                required: true,
                pattern: {
                  /* TODO : cnage the bscse */
                  // value: /\S+@bscse\.uiu\.ac\.bd$/,
                  message: "Entered value does not match email format",
                },
              })}
              name="email"
              placeholder="email"
              className="input-bgRemove"
              type="email"
            />
            {/* {errors.email && (
              <span className="text-red-600">This field is required</span>
            )} */}
          </div>

          <div className="divOfSignUp mt-[2%] mb-[5%]">
            <label> Password</label>
            <br />
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              name="password"
              placeholder="Enter Your password"
              className="input-bgRemove"
            />
          </div>
          {/* this is submit btn */}
          <div className="form-control mt-6 mb-9 w-[80%]">
            <input className="signUpBtn" type="submit" value="Login" />
          </div>
        </form>

        <p>
          Create an account{" "}
          <NavLink to="/register" className={"text-blue-500"}>
            {" "}
            Register
          </NavLink>{" "}
        </p>
      </div>
      <div className="flex-1">
        <img className="w-[100%]" src={loginImg} alt="" />
      </div>
    </div>
  );
};
export default Login;
