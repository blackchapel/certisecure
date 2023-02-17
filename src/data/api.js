import axios from 'axios';

const url = 'https://dvki-production.up.railway.app/api';

export const getInstitutions = async () => {
    try {
        const { data } = await axios.get(url + '/student/view-institutions');
        console.log(data);
        if (data) {
            return data;
        }
    } catch (err) {
        throw err;
    }
};

export const sendRequest = async (token, formData) => {
    try {
        const { data } = await axios.post(url + '/student/request-verification', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(data);
        if (data) {
            return data;
        }
    } catch (err) {
        throw err;
    }
};
