import axios from 'axios'

export const AddPerson = (para) => axios.post('/api/person', para);

export const UpdatePerson = (para) => axios.put('/api/person', para);

export const GetPersonById = (id) => axios.get(`/api/person/${id}`);

export const DeletePerson = (id) => axios.delete(`/api/person/${id}`);

export const GetPersonList = (para) => {
    return axios.get('/api/person/list', { params: para });
}