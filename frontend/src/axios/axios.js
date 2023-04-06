import axios from 'axios'

export const axiosClientInstance = axios.create({ baseURL: 'http://localhost:3001/' });
export const axiosTrainerInstance = axios.create({ baseURL: 'http://localhost:3001/trainer/' });
export const axiosAdminInstance = axios.create({ baseURL: 'http://localhost:3001/admin/' });
