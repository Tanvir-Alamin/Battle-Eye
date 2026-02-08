import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Context/AuthContext";
import { imageUpload } from "../../Utils";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../Shared/Loader";

const AddContest = () => {
  const [uploading, setUploading] = useState(false);

  const { user } = useContext(AuthContext);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (addContest) =>
      await axios.post("http://localhost:3000/all-contests", addContest),
    onSuccess: () => {
      Swal.fire({
        title: "Your Contest Successfully Added",
        icon: "success",
        draggable: true,
      });
    },
    onError: (data) => {
      console.log(data);
    },

    retry: 2,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,

    formState: { errors },
  } = useForm();
  if (uploading || isPending) return <Loader />;

  const onSubmit = async (data) => {
    setUploading(true);
    const {
      contestName,
      gameImage,
      entryFee,
      prizeMoney,
      taskDetails,
      description,
      email,
      date,
    } = data;
    const image = gameImage[0];
    const bannerImage = await imageUpload(image);
    const contestData = {
      contestName,
      bannerImage,
      entryFee: Number(entryFee),
      prizeMoney: Number(prizeMoney),
      taskDetails,
      description,
      email,
      date,
      image: user?.photoURL,
    };
    try {
      await mutateAsync(contestData);
      reset();
      setUploading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="max-w-6xl   mx-auto p-6">
      <div className="text-center">
        {" "}
        <h1 className="text-3xl font-bold mb-2">Create A Contest</h1>
        <p className="mb-6 font-semibold">Enter your contest details</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" mx-auto w-150">
          <div>
            <h2 className="font-bold mb-3">Contest Details</h2>
            <input
              className="input input-bordered w-full mb-3"
              placeholder="Game Name"
              {...register("contestName", { required: true })}
            />
            {errors.contestName && (
              <p className="text-red-500">Game name required</p>
            )}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Upload Image</label>

              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("gameImage", { required: "Image is required" })}
              />

              {errors.bannerImage && (
                <p className="text-red-500">{errors.bannerImage.message}</p>
              )}
            </div>

            <input
              type="number"
              className="input input-bordered w-full mb-3"
              placeholder="Entry fee"
              {...register("entryFee", { required: true })}
            />

            <input
              type="number"
              className="input input-bordered w-full mb-3"
              placeholder="Prize money"
              {...register("prizeMoney", { required: true })}
            />
            <input
              className="input input-bordered w-full mb-3"
              placeholder="Task Details"
              {...register("taskDetails", { required: true })}
            />
            <input
              className="input input-bordered w-full mb-3"
              placeholder="Description"
              {...register("description", { required: true })}
            />
            <Controller
              {...register("date", { required: true })}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select Date"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className="input input-bordered w-full"
                />
              )}
            />
            {errors.date && <p className="text-red-500">Date is required</p>}
            <input
              className="input input-bordered w-full mb-3"
              value={user?.email}
              {...register("email", { required: true })}
            />
          </div>
        </div>

        <div className="text-center ">
          <button className="btn  bg-fuchsia-600 mt-4">
            Proceed to Confirm Your Contest
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContest;
