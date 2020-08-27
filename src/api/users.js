import axios from 'axios'

export const EditPassword = (oldPassword, newPassword) => axios.put(`/api/users/password?oldPassword=${oldPassword}&newPassword=${newPassword}`)

export const reset_password = (id) => axios.put(`/api/users/reset_password?id=${id}`)

export const UserMe = () => axios.get('/api/users/me');

export const Usercreate = (account) => axios.post('/api/users/create')