import axios from 'axios'

export const AddRecipient = (para) => axios.post('/api/recipient', para);

export const UpdateRecipient = (para) => axios.put('/api/recipient', para);

export const GetRecipient = (id) => axios.get(`/api/recipient/${id}`);

export const DeleteRecipient = (id) => axios.delete(`/api/recipient/${id}`);

export const GetRecipientList = (para) => {
    return axios.get('/api/recipient/list', { params: para });
}