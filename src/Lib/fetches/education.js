import axios from "axios";
import authAxios from "./authAxios";
const { REACT_APP_URI_DEV } = process.env;

export const getAllEdu = async () => {
  try {
    const res = await axios.get(`${REACT_APP_URI_DEV}/api/users/education`);
    console.log(res);
    if (res.status == 200) return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const postNewEdu = async (education) => {
  try {
    const res = await authAxios.post(`${REACT_APP_URI_DEV}/api/users/education`, education);
    console.log(res);
    if (res.status == 201) return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const editEdu = async (id, education) => {
  try {
    const res = await authAxios.put(
      `${REACT_APP_URI_DEV}/api/users/education/${id}`,
      education
    );
    if (res.status == 201) return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteEdu = async (id) => {
  try {
    const res = await authAxios.delete(`${REACT_APP_URI_DEV}/api/users/education/${id}`);
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
      `${REACT_APP_URI_DEV}/api/users/education/${id}/upload`,
      pictureFORM
    );
    console.log(res);
    if (res.status == 201) return await res.data;
  } catch (err) {
    console.log(err);
  }
};

export const eduCSV = async () =>{
  try {
    const res = await axios.get(`${REACT_APP_URI_DEV}/api/users/education/download/csv`);
    console.log(res);
    if (res.status == 200) return await res.data;
  } catch (err) {
    console.log(err);
  }
};
