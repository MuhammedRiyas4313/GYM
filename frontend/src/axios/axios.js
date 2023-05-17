import axios from 'axios'

export const axiosClientInstance = axios.create({ baseURL: 'https://gym-trainers-management.onrender.com/' });
export const axiosTrainerInstance = axios.create({ baseURL: 'https://gym-trainers-management.onrender.com/trainer/' });
export const axiosAdminInstance = axios.create({ baseURL: 'https://gym-trainers-management.onrender.com/admin/' });
