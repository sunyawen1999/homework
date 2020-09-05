import axios from 'axios'

export const AddDonor = (para) => axios.post('/api/donor', para);

export const UpdateDonor = (para) => axios.put('/api/donor', para);

export const GetDonor = (id) => axios.get(`/api/donor/${id}`);

export const DeleteDonor = (id) => axios.delete(`/api/donor/${id}`);

export const GetDonorList =(para) => {
    return axios.get('/api/donor/list',{ params:para });
}