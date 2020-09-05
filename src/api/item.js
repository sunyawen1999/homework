import axios from 'axios'

export const AddItem = (para) => axios.post('/api/item', para);

export const UpdateItem = (para) => axios.put('/api/item', para);

export const GetItem = (id) => axios.get(`/api/item/${id}`);

export const DeleteItem= (id) => axios.delete(`/api/item/${id}`);

export const GetItem = (para) => {
    return axios.get('/api/item/list', { params: para });
}