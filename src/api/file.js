import axios from "axios";

export const AddFile = (para) => axios.post('/api/file', para);
