import axios from 'axios'

export const AddDonationRecord = (para) => axios.post('/api/donationrecord', para);

export const UpdateDonationRecord = (para) => axios.put('/api/donationrecord', para);

export const GetDonationRecord = (id) => axios.get(`/api/donationrecord/${id}`);

export const DeleteDonationRecord = (id) => axios.delete(`/api/donationrecord/${id}`);

export const GetDonationRecordList = (para) => {
    return axios.get('/api/donationrecord/list', { params: para });
}