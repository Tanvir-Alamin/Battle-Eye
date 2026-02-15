import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { BsEyeFill } from "react-icons/bs";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { GiBurningSkull } from "react-icons/gi";
import { saveOrUpdateUser } from "../../Utils";

const LogIn = () => {
  const location = useLocation();
  const address = location.state;
  const locate = address || "/home";

  const navigate = useNavigate();
  const { google, user, setUser, mailLogIn } = useContext(AuthContext);
  const [eye, setEye] = useState(false);
  const submitGoogle = async (e) => {
    e.preventDefault();
    const { user } = await google();
    console.log(user);

    await saveOrUpdateUser({
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    })
      .then((result) => {
        Swal.fire({
          title: `Login Successfully`,
          text: `Welcome`,
          icon: "success",
        });
        setUser(result.user);
        navigate(locate);
      })
      .catch((error) => console.log(error.code));
  };
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  console.log(errors);

  const loginHandle = async (data) => {
    const { email, password } = data;

    mailLogIn(email, password)
      .then((result) => {
        saveOrUpdateUser({
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        });

        Swal.fire({
          title: `Login Successfully`,
          text: `Welcome Back`,
          icon: "success",
        });
        navigate(locate);
        data.target.reset();
        setUser(result.user);
      })
      .catch(
        (error) => console.log(error),

        Swal.fire({
          title: "Error!",
          text: "Login failed. Please check your credentials.",
          icon: "error",
        }),
      );
  };
  return (
    <div>
      <div>
        <div className="flex items-center  justify-center">
          <div className=" bg-[#f90667] flex justify-between  my-25 shadow-2xl rounded-2xl ">
            <form onSubmit={handleSubmit(loginHandle)} className="">
              <fieldset className="fieldset  border-none rounded-box mt-5 w-xs mx-15 border p-4">
                <div className="text-3xl text-center text-gray-950 font-sans font-semibold">
                  Sign in to Join
                </div>

                <label className="label text-gray-950 font-semibold">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="input  bg-green-50"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                      message: "Please enter valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-white flex items-center gap-1 text-xs font-semibold mt-1">
                    {errors.email?.message}
                    <GiBurningSkull size={17} />
                  </p>
                )}
                <label className="label text-gray-950 font-semibold">
                  Password
                </label>
                <div className="items-center flex relative">
                  <input
                    name="password"
                    type={!eye ? "password" : "text"}
                    className="input bg-green-50"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is Required",
                      pattern: {
                        message: "Password should be at least 6 characters",
                      },
                    })}
                  />
                  <p
                    className="absolute ml-[90%]"
                    onClick={() => {
                      setEye(!eye);
                    }}
                  >
                    {!eye ? <EyeOff /> : <Eye />}
                  </p>
                </div>
                {errors.password && (
                  <p className="text-white flex items-center gap-1 text-xs font-semibold mt-1">
                    {errors.password?.message}
                    <GiBurningSkull size={17} />
                  </p>
                )}

                <Link className="text-xs mt-1 underline text-blue-900">
                  Forgot your password?
                </Link>

                <button className="btn bg-green-700  text-white font-bold mt-4">
                  Login
                </button>
              </fieldset>
              <div className="flex items-center justify-center">
                <div>────────</div>
                <div className="mx-3">Or continue with</div>
                <div>────────</div>
              </div>
              <div onClick={submitGoogle} className="flex my-5 justify-center">
                {" "}
                <button className="btn bg-white w-71 text-black border-[#e5e5e5]">
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>
              </div>
              <div className="flex my-5 justify-center">
                Don't have an account?{" "}
                <Link to="/register" className="ml-1 text-green-300 underline">
                  {" "}
                  Sign up here
                </Link>
              </div>
            </form>
            <img
              className="md:w-100 hidden md:block rounded-4xl shadow-black shadow-2xl rounded-r-2xl h-full"
              src="https://i.ibb.co/7tZ3VSMT/cod.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
