import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaEdit } from "react-icons/fa";
import { MdCancel, MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import Loader from "../../Shared/Loader";
import Aos from "aos";
import "aos/dist/aos.css";
import { Controller, useForm } from "react-hook-form";
import { imageUpload } from "../../Utils";
import DatePicker from "react-datepicker";

const AdminAllContest = () => {
  Aos.init({
    duration: 1400,
    once: true,
  });
  const [uploading, setUploading] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    reset,

    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (selectedContest) {
      reset({
        contestName: selectedContest.contestName,
        entryFee: selectedContest.entryFee,
        prizeMoney: selectedContest.prizeMoney,
        description: selectedContest.description,
      });
    }
  }, [selectedContest, reset]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (contestData) =>
      await axios.patch(
        `http://localhost:3000/update/${selectedContest._id}`,
        contestData,
      ),
    onSuccess: () => {
      Swal.fire({
        title: "Your Contest Successfully Updated",
        icon: "success",
        draggable: true,
      });
      window.location.reload();
    },
    onError: (err) => {
      console.log(err);
    },
    retry: 2,
  });
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmDelete.isConfirmed) return;

    const res = await axios.delete(
      `http://localhost:3000/delete-contest/${id}`,
    );

    if (res.data.success) {
      Swal.fire({
        title: "Deleted!",
        text: res.data.message,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      // Page reload or you can refetch query instead
      window.location.reload();
    } else {
      Swal.fire({
        title: "Error!",
        text: res.data.message || "Could not delete",
        icon: "error",
      });
    }
  };

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
      creator: user?.displayName,
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

  const [open, setOpen] = useState(false);

  const { user, loading } = useContext(AuthContext);
  const email = user?.email;
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", email],
    queryFn: async () => {
      const result = await axios(`http://localhost:3000/all-contests`);
      return result.data;
    },
  });

  if (loading || uploading || isLoading || isPending) return <Loader></Loader>;

  return (
    <div>
      <h1 className="m-7 text-xl font-bold">All Approved Contests :</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Entry Fee</th>
              <th>Prize Money</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr data-aos="zoom-in" key={item._id}>
                <th>{index + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.bannerImage} alt={item.contestName} />
                      </div>
                    </div>
                    <div className="font-bold">{item.contestName}</div>
                  </div>
                </td>

                <td>
                  <span className="">${item.entryFee}</span>
                </td>
                <td>
                  <span className="">${item.prizeMoney}</span>
                </td>

                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>
                  <span
                    onClick={() => {
                      setSelectedContest(item);
                      setOpen(true);
                    }}
                    className="flex w-25 mb-0.5 btn btn-sm gap-1 items-center"
                  >
                    <FaEdit size={16} />
                    Update
                  </span>
                  <span
                    onClick={() => handleDelete(item._id)}
                    className="flex w-25 btn btn-sm gap-1 items-center"
                  >
                    <MdDeleteForever size={17} />
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open ? (
        <div
          data-aos="zoom-in"
          className="fixed  inset-0 flex items-center justify-center  z-50 p-4"
        >
          <div className=" rounded-2xl bg-base-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md"
            >
              <MdCancel size={20} />
            </button>

            <div className="max-w-6xl   mx-auto p-6">
              <div className="text-center">
                {" "}
                <h1 className="text-3xl font-bold mb-2">Update Contest</h1>
                <p className="mb-6 font-semibold">
                  Update your contest details
                </p>
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
                      <label className="block font-semibold mb-1">
                        Upload Image
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        {...register("gameImage", {
                          required: "Image is required",
                        })}
                      />

                      {errors.bannerImage && (
                        <p className="text-red-500">
                          {errors.bannerImage.message}
                        </p>
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
                    {errors.date && (
                      <p className="text-red-500">Date is required</p>
                    )}
                    <input
                      className="input input-bordered w-full mb-3"
                      value={user?.email}
                      {...register("email", { required: true })}
                    />
                  </div>
                </div>

                <div className="text-center ">
                  <div className="flex gap-3 p-6 border-t">
                    <button
                      onClick={() => setOpen(false)}
                      className="btn btn-outline flex-1 rounded-full"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => onSubmit()}
                      className="btn bg-green-600 hover:bg-green-700 text-white flex-1 rounded-full"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* Footer Buttons */}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminAllContest;
