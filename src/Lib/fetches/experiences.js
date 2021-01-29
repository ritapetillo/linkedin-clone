import axios from "axios";
import authAxios from "./authAxios";
const { REACT_APP_URI_DEV } = process.env;

export const getAllExp = async () => {
  try {
    const res = await axios.get(`${REACT_APP_URI_DEV}/api/users/experiences`);
    console.log(res);
    if (res.status == 200) return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const postNewExp = async (experience) => {
  try {
    const res = await authAxios.post(`${REACT_APP_URI_DEV}/api/users/experiences`, experience);
    console.log(res);
    if (res.status == 201) return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const editExp = async (id, experience) => {
  try {
    const res = await authAxios.put(
      `${REACT_APP_URI_DEV}/api/users/experiences/${id}`,
      experience
    );
    if (res.status == 201) return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteExp = async (id) => {
  try {
    const res = await authAxios.delete(`${REACT_APP_URI_DEV}/api/users/experiences/${id}`);
    if (res.status == 201) return await res;
  } catch (err) {
    console.log(err);
  }
};

export const uploadPicture = async (id, picture) => {
  const pictureFORM = new FormData();
  pictureFORM.append("image", picture);
try {
    const res = await authAxios.post(
      `${REACT_APP_URI_DEV}/api/users/experiences/${id}/upload`,
      pictureFORM
    );
    console.log(res);
    if (res.status == 201) return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const expCSV = async () =>{
  try {
    const res = await axios.get(`${REACT_APP_URI_DEV}/api/users/experiences/download/csv`);
    console.log(res);
    if (res.status == 200) return await res.data;
  } catch (err) {
    console.log(err);
  }
};
