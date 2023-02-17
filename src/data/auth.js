import axios from 'axios';

const url = 'https://dvki-production.up.railway.app/api';

export const signupPost = async (token, formData) => {
    try {
        const { data } = await axios.post(`${url}/auth/signup`, formData);
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const loginPost = async (formData) => {
    try {
        const { data } = await axios.post(`${url}/auth/signin`, formData);
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const changePassword = async (token, formData) => {
    try {
        const { data } = await axios.put(url + '/auth/changepassword', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
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
        const { data } = await axios.put(url + '/auth/logout', token, {
            headers: {
                Authorization: `Bearer ${token}`
            }
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
        const { data } = await axios.post(url + '/auth/forgotpassword', formData);
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const resetPassword = async (formData, token) => {
    try {
        const { data } = await axios.put(url + '/auth/resetpassword/' + token, formData);
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
