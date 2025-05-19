import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { error },
  } = useForm();
  // this is the  the part of the

  const onSubmit = (data) => {
    console.log("this is register ");
  };

  return (
    <div className="p-10 bg-white flex items-center">
      <div className="flex-1">
        <h1 className="textColor mb-[10%] ">UiU CLS</h1>
        <p className="textColor ml-[65%]">
          <u>Sign Up</u>
        </p>
        <p>Create Your Account To Explore The Wisdom</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div className="mt-[5%] divOfSignUp">
            <label>First Name </label>
            <br />
            <input
              type="text"
              {...register("firstName")}
              required={true}
              name="firstName"
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
                  // value: /\S+@bscse\.uiu\.ac\.bd$/,
                  message: "Entered value does not match email format",
                },
              })}
              name="email"
              placeholder="email"
              className="input-bgRemove"
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
              className="input-bgRemove"
            />
          </div>

          {/* University Name */}
          <div className="mt-[5%] divOfSignUp">
            <label>University Name</label>
            <br />
            <input
              type="text"
              {...register("universityName")}
              name="universityName"
              placeholder="Enter Your University Name"
              className="input-bgRemove"
            />
          </div>

          {/* Department Name */}
          <div className="mt-[5%] divOfSignUp">
            <label>Department Name</label>
            <br />
            <select
              {...register("subject", { required: true })}
              name="subject"
              className="input-bgRemove"
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
              className="input-bgRemove"
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
              className="input-bgRemove"
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
              className="input-bgRemove"
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6 mb-9 w-[80%]">
            <input className="signUpBtn" type="submit" value="Create Account" />
          </div>
        </form>
      </div>

      <div className="flex-1">
        {/* <img className="w-[100%]" src={loginImg} alt="" /> */}
      </div>
    </div>
  );
};

export default Register;
