import { Eye, EyeOff, Vault } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { IoSkullOutline } from "react-icons/io5";
import { GiBurningSkull, GiSkullBolt } from "react-icons/gi";
import axios from "axios";
import { imageUpload } from "../../Utils";

const Register = () => {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const { userWithEmail, setUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, name, photoURL } = data;
    const image = photoURL[0];
    const useImage = await imageUpload(image);
    console.log(useImage);

    userWithEmail(email, password)
      .then((result) => {
        updateProfile(result.user, { displayName: name, photoURL: useImage });

        Swal.fire({
          title: `Account Created Successfully`,
          text: `Thanks for signing up`,
          icon: "success",
        });
        console.log(result);

        setUser(result.user);
        data.target.reset();
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div>
        <div className="flex items-center  justify-center">
          <div className=" bg-[#f90667] flex justify-between mt-10 mb-25 shadow-2xl rounded-2xl ">
            <img
              className="md:w-92 hidden md:block rounded-4xl shadow-black shadow-2xl rounded-l-2xl h-full"
              src="https://i.ibb.co/SDb00wx8/Valorent.jpg"
              alt=""
            />
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <fieldset className="fieldset  border-none rounded-box mt-0 w-xs mx-15 border pt-2 px-4">
                <div className="text-3xl text-center text-gray-950 font-sans font-semibold">
                  Sign Up <br></br>
                  <span className="text-sm block">
                    Create your account to get started
                  </span>
                </div>

                <label className="label text-gray-950 font-semibold">
                  Full Name *
                </label>
                <input
                  type=""
                  className="input  bg-green-50"
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: "Name is Required",
                    maxLength: {
                      value: 15,
                      message: "Name cannot be too long",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-white flex items-center gap-1 text-xs font-semibold mt-1">
                    {errors.name?.message}
                    <GiBurningSkull size={17} />
                  </p>
                )}
                <label className="label text-gray-950 font-semibold">
                  Email *
                </label>
                <input
                  type="email"
                  className="input  bg-green-50"
                  placeholder="Enter your email"
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
                  Photo *
                </label>
                <input
                  {...register("photoURL", {
                    required: "Photo is Required",
                  })}
                  type="file"
                  className="file-input bg-green-50"
                />
                {errors.photoURL && (
                  <p className="text-white flex items-center gap-1 text-xs font-semibold mt-1">
                    {errors.photoURL?.message}
                    <GiBurningSkull size={17} />
                  </p>
                )}

                <label className="label text-gray-950 font-semibold">
                  Password *
                </label>
                <div className="items-center flex relative">
                  <input
                    type={!eye ? "password" : "text"}
                    className="input bg-green-50"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is Required",
                      pattern: {
                        value: /^.{6,}$/,
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
                    {" "}
                    {!eye ? <EyeOff /> : <Eye />}
                  </p>
                </div>
                {errors.password && (
                  <p className="text-white flex items-center gap-1 text-xs font-semibold mt-1">
                    {errors.password?.message}
                    <GiBurningSkull size={17} />
                  </p>
                )}

                <button className="btn bg-green-700 text-white font-bold mt-2">
                  Sign up
                </button>
              </fieldset>

              <div className="flex my-1 justify-center">
                Already have an account?{" "}
                <Link to="/login" className="ml-1 text-green-300 underline">
                  {" "}
                  Sign in here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
