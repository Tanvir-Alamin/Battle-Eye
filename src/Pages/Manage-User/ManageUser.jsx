import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdCancel, MdDeleteForever, MdOutlinePayment } from "react-icons/md";
import Aos from "aos";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import "aos/dist/aos.css";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../Shared/Loader";
import { toast } from "react-toastify";

const ManageUser = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    if (selectedUser) {
      reset({
        role: selectedUser.role,
      });
    }
  }, [selectedUser, reset]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (contestData) =>
      await axios.patch(
        `http://localhost:3000/update/user-role/${selectedUser._id}`,
        contestData,
      ),
    onSuccess: () => {
      toast.success("Updated Successfully");
      window.location.reload();
    },
    onError: (err) => {
      console.log(err);
    },
    retry: 2,
  });
  const [open, setOpen] = useState(false);
  const onSubmit = async (data) => {
    const role = data.newRole;

    const contestData = {
      role,
    };
    try {
      await mutateAsync(contestData);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  Aos.init({
    duration: 900,
    once: true,
  });
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/dashboard/manage-user",
        );
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(user);
  if (isPending) return <Loader></Loader>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Member Since</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {user.map((item, index) => (
              <tr data-aos="zoom-in" key={item._id}>
                <th>{index + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                    <div className="font-bold">{item.name}</div>
                  </div>
                </td>

                <td>
                  <span className="">{item.email}</span>
                </td>
                <td>
                  <span className="">{item.role}</span>
                </td>

                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>
                  <Link
                    onClick={() => {
                      (setOpen(true), setSelectedUser(item));
                    }}
                  >
                    <div className="hover-3d">
                      {/* content */}
                      <figure className="max-w-100 rounded-2xl">
                        <span className="bg-green-500 px-1.5 py-1 hover-3d text-black btn rounded-3xl">
                          Update Role
                        </span>
                      </figure>
                      {/* 8 empty divs needed for the 3D effect */}
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-10">
        {/* Modal of update role here */}

        {open ? (
          <div
            data-aos="zoom-in"
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-2xl w-105 overflow-hidden shadow-2xl relative">
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md"
              >
                <MdCancel size={20} />
              </button>

              {/* Top Gradient Section */}
              <div className="h-40 bg-linear-to-b from-purple-600 to-white flex justify-center items-center">
                <div className="bg-pink-600 p-6 rounded-xl shadow-lg">
                  <span className="text-white text-3xl">
                    <VscWorkspaceUnknown />
                  </span>
                </div>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6 text-center">
                  {" "}
                  <select
                    defaultValue=""
                    className="select my-3 appearance-none"
                    {...register("newRole", { required: true })}
                  >
                    <option disabled={true}>Select a role</option>
                    <option>Admin</option>
                    <option>Creator</option>
                    <option>Gamer</option>
                  </select>
                  <p className="text-gray-500 text-sm mb-4">Select User Role</p>
                  <div className="text-start"> </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-center gap-3 p-6 border-t">
                  <button onClick={() => setOpen(false)}>
                    <div className="hover-3d">
                      {/* content */}
                      <figure className="max-w-100 rounded-2xl">
                        <span className="btn bg-slate-600 px-5 text-white btn-outline flex-1 rounded-full">
                          {" "}
                          Cancel
                        </span>
                      </figure>
                      {/* 8 empty divs needed for the 3D effect */}
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>{" "}
                  </button>
                  <button type="submit" onClick={() => "handlePaymnet"()}>
                    <div className="hover-3d">
                      {/* content */}
                      <figure className="max-w-100 rounded-2xl">
                        <span className="btn bg-green-600  text-white flex-1 rounded-full">
                          {" "}
                          Set Role
                        </span>
                      </figure>
                      {/* 8 empty divs needed for the 3D effect */}
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ManageUser;
