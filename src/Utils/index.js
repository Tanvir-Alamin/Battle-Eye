import axios from "axios";

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const imageUrl = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_API}`,
    formData,
  );

  return imageUrl.data.data.display_url;
};

// save or update user

export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post("http://localhost:3000/user", userData);
  return data;
};
