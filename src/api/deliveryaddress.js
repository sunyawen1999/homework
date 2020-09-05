import axios from 'axios'

export const AddDeliveryAddress = (para) => axios.post('/api/deliveryaddress', para);

export const UpdateDeliveryAddress = (para) => axios.put('/api/deliveryaddress', para);

export const GetDeliveryAddress = (id) => axios.get(`/api/deliveryaddress/${id}`);

export const DeleteDeliveryAddress = (id) => axios.delete(`/api/deliveryaddress/${id}`);

export const GetDeliveryAddressList = (para) => {
    return axios.get('/api/deliveryaddress/list', { params: para });
}