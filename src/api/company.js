import axios from 'axios'

export const AddCompany = (para) => axios.post('/api/company', para);

export const UpdateCompany = (para) => axios.put('/api/company', para);

export const GetCompany = (id) => axios.get(`/api/company/${id}`);

export const DeleteCompany = (id) => axios.delete(`/api/company/${id}`);

export const GetCompanyList = (para) => {
    return axios.get('/api/company/list', { params: para });
}