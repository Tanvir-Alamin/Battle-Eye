import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../../Shared/Loader";
import Aos from "aos";
import "aos/dist/aos.css";

const ParticipatedContests = () => {
  Aos.init({
    duration: 1400,
    once: true,
  });
  const { user, loading } = useContext(AuthContext);
  const email = user?.email;

  const { data = [], isLoading } = useQuery({
    queryKey: ["contests", email],
    enabled: !!email,
    queryFn: async () => {
      const result = await axios(
        `http://localhost:3000/dashboard/participated-contests/${email}`,
      );
      return result.data;
    },
  });

  if (loading || isLoading) return <Loader />;

  return (
    <div>
      <h1 className="m-7 text-xl font-bold">My Participated Contests :</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Payment Status</th>
              <th>Joined</th>
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
                        <img src={item.image} alt={item.contestName} />
                      </div>
                    </div>
                    <div className="font-bold">{item.contestName}</div>
                  </div>
                </td>

                <td>
                  <span className="badge badge-success">Paid {item.paid}</span>
                </td>

                <td>{new Date(item.time).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipatedContests;
