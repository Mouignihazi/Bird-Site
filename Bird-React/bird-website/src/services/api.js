import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000' });

export const getBirds = () => API.get('/species');
export const getBirdById = (id) => API.get(`/species/${id}`);
export const addBird = (data) => API.post('/species', data);
export const deleteBird = (id) => API.delete(`/species/${id}`);
export const addBirdImage = (id, data) => API.post(`/species/${id}/images`, data);
