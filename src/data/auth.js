import axios from "axios";

const url = "https://dvkitemp-production.up.railway.app/api";
// const url = "http://localhost:5000/api";

export const createAccount = async (token, formData) => {
  try {
    const { data } = await axios.post(`${url}/auth/signup`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const loginPost = async (formData) => {
  try {
    const { data } = await axios.post(`${url}/auth/login`, formData);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const changePassword = async (token, formData) => {
  try {
    const { data } = await axios.put(url + "/auth/changepassword", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const logoutPost = async (token) => {
  try {
    const { data } = await axios.put(url + "/auth/logout", token, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data) {
      return data;
    }
  } catch (err) {
    throw err;
  }
};

export const forgotPassword = async (formData) => {
  try {
    const { data } = await axios.post(url + "/auth/forgotpassword", formData);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export const resetPassword = async (formData, token) => {
  try {
    const { data } = await axios.put(url + "/auth/resetpassword/" + token, formData);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}