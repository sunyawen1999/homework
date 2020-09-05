import axios from 'axios'

export const AddDonateItem= (para) => axios.post('/api/item', para);

export const UpdateDonateItem = (para) => axios.put('/api/item', para);

export const GetDonateItem = (id) => axios.get(`/api/item/${id}`);

export const DeleteDonateItem= (id) => axios.delete(`/api/item/${id}`);

export const GetDonateItemList = (para) => {
    return axios.get('/api/item/list', { params: para });
}

export const CheckDonateItem = (para) => axios.put('/api/item/check', para);
