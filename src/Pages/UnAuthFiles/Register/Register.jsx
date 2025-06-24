import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import login from "../../../../src/assets/images/login.jpg";
const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { error },
  } = useForm();

  const onSubmit = async (data) => {
    const UserData = {
      password: data.password,
      blood: data.blood,
      email: data.email,
      departmentName: data.departmentName,
      role: data.role,
      varsityName: data.varsityName,
      name: data.name,
    };
    console.log(UserData);
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/create-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        navigate("/login");
        alert("Registration successful!");
        reset(); // Clear form
      } else {
        alert(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong while submitting the form.");
    }
  };

  return (
    <div className="p-10 bg-white flex items-center">
      <div className="flex-1">
        <h1 className="textColor mb-[10%] ">EDU Hub </h1>
        <p className="textColor ml-[65%]">
          <u>Sign Up</u>
        </p>
        <p>Create Your Account To Explore The Wisdom</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div className="mt-[5%] divOfSignUp">
            <label>Name </label>
            <br />
            <input
              type="text"
              {...register("name")}
              required={true}
              name="name"
              placeholder="Enter Your First Name "
              className="input-bgRemove"
            />
          </div>

          {/* Email */}
          <div className="mt-[5%] divOfSignUp">
            <label>Email</label>
            <br />

            <input
              {...register("email", {
                required: true,
                pattern: {
                  message: "Entered value does not match email format",
                },
              })}
              name="email"
              placeholder="email"
              className="input-bgRemove w-full"
              type="email"
            />
          </div>

          {/* Photo URL */}
          <div className="mt-[5%] divOfSignUp">
            <label>Photo URL</label>
            <br />
            <input
              type="text"
              {...register("photo")}
              name="photo"
              placeholder="Enter Your Photo URL"
              className="input-bgRemove w-full"
            />
          </div>

          {/* University Name */}
          <div className="mt-[5%] divOfSignUp">
            <label>University Name</label>
            <br />
            <input
              type="text"
              {...register("varsityName")}
              name="varsityName"
              placeholder="Enter Your University Name"
              className="input-bgRemove w-full"
            />
          </div>

          {/* Department Name */}
          <div className="mt-[5%] divOfSignUp">
            <label>Department Name</label>
            <br />
            <select
              {...register("departmentName", { required: true })}
              name="departmentName"
              className="input-bgRemove w-full"
              defaultValue="CSE"
            >
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
              <option value="BBA">BBA</option>
              <option value="CE">CE</option>
              <option value="ECONOMICS">ECONOMICS</option>
            </select>
          </div>

          {/* Role */}
          <div className="mt-[5%] divOfSignUp">
            <label>Role</label>
            <br />
            <select
              {...register("role")}
              name="role"
              className="input-bgRemove w-full"
              defaultValue="student"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Blood Group */}
          <div className="mt-[5%] divOfSignUp">
            <label>Blood Group</label>
            <br />
            <select
              {...register("blood")}
              name="blood"
              className="input-bgRemove w-full"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Password */}
          <div className="divOfSignUp mt-[2%] mb-[5%]">
            <label>Password</label>
            <br />
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              name="password"
              placeholder="Enter Your password"
              className="input-bgRemove w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6 mb-9 w-[80%]">
            <input className="signUpBtn" type="submit" value="Create Account" />
          </div>
        </form>{" "}
        <p>
          Already have an account{" "}
          <NavLink to="/login" className={"text-blue-500"}>
            {" "}
            Login
          </NavLink>{" "}
        </p>
      </div>

      <div className="flex-1">
        <img className="w-[100%]" src={login} alt="" />
      </div>
    </div>
  );
};

export default Register;
