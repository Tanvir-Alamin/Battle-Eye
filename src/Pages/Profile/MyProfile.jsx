import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../../Shared/Loader";
import useRole from "../../Hooks/useRole";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { MdCancel, MdLogout } from "react-icons/md";
import { UserPen } from "lucide-react";
import { imageUpload } from "../../Utils";
import Aos from "aos";
import "aos/dist/aos.css";

const MyProfile = () => {
  Aos.init({
    duration: 1400,
    once: true,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  const { user, loading, signOutFromAll } = useContext(AuthContext);
  const [role] = useRole();

  if (loading || !user) return <Loader />;

  const editor = () => setUpdate(true);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const name = e.target.name.value.trim();
    if (!name) return setError("Full Name is required");

    let photoURL = user.photoURL || user.image || "/default-avatar.png";
    const fileInput = e.target.updateImage;
    if (fileInput.files.length > 0) {
      try {
        photoURL = await imageUpload(fileInput.files[0]);
      } catch (err) {
        console.error(err);
        return setError("Image upload failed. Try again.");
      }
    }

    try {
      await updateProfile(user, { displayName: name, photoURL });
      setSuccess(true);
      toast.success("Profile Updated Successfully", { theme: "colored" });
      setUpdate(false);
    } catch (err) {
      console.error(err);
      setError("Profile update failed. Try again.");
    }
  };

  const logOut = async () => {
    try {
      await signOutFromAll();
      navigate("/home");
    } catch (err) {
      console.error(err.message);
    }
  };
  console.log(user);

  return (
    <div className="text-center mt-10 ">
      {/* Profile Card */}
      <div data-aos="zoom-in" className="hover-3d mb-5 ">
        <figure className="max-w-100 rounded-2xl">
          <div className="bg-base-200 flex flex-col items-center w-75 h-85 justify-center rounded-3xl gap-5">
            <img
              src={user.photoURL || user.image || "/default-avatar.png"}
              alt="Profile"
              referrerPolicy="no-referrer"
              className="w-40 h-40 rounded-full object-cover"
            />

            <h1 className="bg-[#7b1fa2] px-3 py-1.5 rounded-4xl">{role}</h1>
            <h1>{user.displayName}</h1>
            <h1>{user.email}</h1>
          </div>
        </figure>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Buttons */}
      <div className="flex md:flex-row flex-col justify-center gap-4 mt-4">
        <button
          onClick={editor}
          className="btn flex items-center gap-1 bg-[#7b1fa2] rounded-xl px-3 py-1 font-semibold"
        >
          <UserPen /> Update Profile
        </button>
        <button
          onClick={logOut}
          className="btn flex items-center gap-1 bg-[#7b1fa2] rounded-xl px-8 py-1 font-semibold"
        >
          <MdLogout /> Log Out
        </button>
      </div>

      {/* Modal */}
      {update && (
        <div
          data-aos="zoom-in-down"
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          {" "}
          <div className="px-10 rounded-2xl w-105 bg-gray-200 flex flex-col items-center justify-center max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fadeIn p-6">
            {/* Close Button */}
            <button
              onClick={() => setUpdate(false)}
              className="absolute top-3 right-3 rounded-full p-1 shadow-md"
            >
              <MdCancel size={20} />
            </button>

            <div className="text-center pt-15  mb-6">
              <h1 className="text-xl font-bold mb-2">Update Profile</h1>
              <p className="font-semibold text-md">Update your details</p>
            </div>

            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <label className="label text-lg  font-semibold">New Name *</label>
              <input
                name="name"
                type="text"
                className="input bg-green-550"
                placeholder="Enter your full name"
              />

              <label className="label text-lg  font-semibold">
                Email (cannot be changed)
              </label>
              <input
                name="email"
                type="email"
                readOnly
                style={{ cursor: "not-allowed" }}
                className="input bg-green-550"
                placeholder={user.email}
              />

              <label className="label text-lg font-semibold">
                New Photo URL
              </label>
              <input
                name="updateImage"
                type="file"
                accept="image/*"
                className="file-input file-input-bordered "
              />
              {error && <p className="text-red-500 font-semibold">{error}</p>}
              {success && (
                <p className="text-blue-600 font-semibold">
                  Profile updated successfully!
                </p>
              )}

              <div className="flex flex-col gap-4 mt-4">
                <button
                  type="submit"
                  className="btn py-2  btn-accent flex-1 font-bold"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setUpdate(false)}
                  className="btn  py-2 btn-soft flex-1 font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
