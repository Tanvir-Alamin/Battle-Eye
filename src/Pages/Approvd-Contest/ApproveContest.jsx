import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HiOutlineCheckCircle } from "react-icons/hi";

import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaEdit } from "react-icons/fa";
import { MdCancel, MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import Loader from "../../Shared/Loader";
import Aos from "aos";
import "aos/dist/aos.css";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

const ApproveContest = () => {
  Aos.init({
    duration: 1400,
    once: true,
  });
  const [contest, setContest] = useState([]);

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/approve-contest/${id}`, {
        Status: "Approved",
      });
      toast.success("Successfully Approved a Contest!");
      // update UI after change
      setContest((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
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

  const { user, loading } = useContext(AuthContext);
  const email = user?.email;
  const { isLoading } = useQuery({
    queryKey: ["contests", email],
    enabled: !!email,
    queryFn: async () => {
      const result = await axios(`http://localhost:3000/pending-contests`);
      setContest(result.data);
    },
  });
  if (loading || isLoading) return <Loader></Loader>;

  return (
    <div>
      <h1 className="m-7 text-xl font-bold">Pending Contests :</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Entry Fee</th>
              <th>Prize Money</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {contest.map((item, index) => (
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
                <td>
                  <span className="">{item.status}</span>
                </td>

                <td>
                  <span
                    onClick={() => {
                      handleUpdate(item._id);
                    }}
                    className="flex w-30 mb-0.5 btn btn-sm gap-1 items-center"
                  >
                    <HiOutlineCheckCircle size={17} />
                    Approve
                  </span>
                  <span
                    onClick={() => handleDelete(item._id)}
                    className="flex w-30 btn btn-sm gap-1 items-center"
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
    </div>
  );
};

export default ApproveContest;
