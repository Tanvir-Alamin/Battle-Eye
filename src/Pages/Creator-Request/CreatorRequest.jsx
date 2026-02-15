import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdCancel, MdDeleteForever, MdOutlinePayment } from "react-icons/md";
import Aos from "aos";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import "aos/dist/aos.css";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loader from "../../Shared/Loader";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const CreatorRequest = () => {
  const axiosSecure = useAxiosSecure();
  Aos.init({
    duration: 900,
    once: true,
  });
  const [user, setUser] = useState([]);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://battle-eye-server.vercel.app/dashboard/creator-request",
        );
        setUser(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  if (!user || loading) return <Loader></Loader>;
  const handleUpdate = async (email) => {
    try {
      await axiosSecure.patch("/update-role", {
        email,
        role: "Creator",
      });
      toast.success("User promoted to Creator!");
      // update UI after change
      setUser((prev) => prev.filter((u) => u.email !== email));
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  console.log(user);

  return (
    <div>
      <div className="overflow-x-auto">
        <h1 className="m-7 text-xl font-bold">Requested User List :</h1>
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>

              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {user?.map((item, index) => (
              <tr data-aos="zoom-in" key={item?._id}>
                <th>{index + 1}</th>
                <td>{item.email}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(item?.email)}
                    className="bg-green-500 px-2 py-1 rounded-3xl text-white hover:bg-green-600"
                  >
                    Make Creator
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-10"></div>
    </div>
  );
};

export default CreatorRequest;
