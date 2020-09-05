import axios from 'axios'

export const EditPassword = (oldPassword, newPassword) => axios.put(`/api/users/password?oldPassword=${oldPassword}&newPassword=${newPassword}`)

export const ResetPassword = (id) => axios.put(`/api/users/reset_password?id=${id}`)

export const UserMe = () => axios.get('/api/users/me');

export const UserCreate = (para) => axios.post('/api/users/create/account',para);

export const UserUpdate = (para) => axios.put('api/users',para);

export const GetUserList = (para) => {
    return axios.get('/api/users/list', { params: para });
}

export const DeleteUser = (id) => axios.delete(`/api/users/${id}`);

export const GetUser = (id) => axios.get(`/api/user/${id}`);
