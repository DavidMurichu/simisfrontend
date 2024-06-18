import axios from 'axios';
import BaseLink from './baselink';

const BASE_URL = BaseLink.getBaseLink();

class ApiService {
    static async get(endpoint, params = {}, requiresAuth = true) {
        try {
            const headers = {
                'ngrok-skip-browser-warning': true,
            };
            if (requiresAuth) {
                const token = sessionStorage.getItem('token');
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await axios.get(`${BASE_URL}/${endpoint}`, {
                headers,
                params,
            });
            return response;
        } catch (error) {
            console.error(`GET request failed: ${error.message}`);
            throw error;
        }
    }

    static async post(endpoint, data, requiresAuth = true) {
        try {
            const headers = {
                'ngrok-skip-browser-warning': true,
            };
            if (requiresAuth) {
                const token = sessionStorage.getItem('token');
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await axios.post(`${BASE_URL}/${endpoint}`, data, {
                headers,
            });
            return response;
        } catch (error) {
            console.error(`POST request failed: ${error.message}`);
            throw error;
        }
    }

    static async getById(endpoint, id, requiresAuth = true) {
        try {
            const headers = {
                'ngrok-skip-browser-warning': true,
            };
            if (requiresAuth) {
                const token = sessionStorage.getItem('token');
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await axios.get(`${BASE_URL}/${endpoint}/${id}`, {
                headers,
            });
            return response;
        } catch (error) {
            console.error(`GET by ID request failed: ${error.message}`);
            throw error;
        }
    }

    static async postById(endpoint, id, data, requiresAuth = true) {
        try {
            const headers = {
                'ngrok-skip-browser-warning': true,
            };
            if (requiresAuth) {
                const token = sessionStorage.getItem('token');
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await axios.post(`${BASE_URL}/${endpoint}/${id}`, data, {
                headers,
            });
            return response;
        } catch (error) {
            console.error(`POST by ID request failed: ${error.message}`);
            throw error;
        }
    }

    static async createCharge(formData) {
        try {
            const endpoint = 'home/add_data/sch_vote_heads';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,
                formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': true,
                    }
                });
            return response.data;
        } catch (error) {
            console.error('Error adding user to database', error);
            throw error;
        }
    }

    static async fetchPaymentTerm() {
        try {
            const endpoint = 'home/get_data/sch_payment_terms';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': true,
                    }
                });
            return response;
        } catch (error) {
            console.error('Error adding user to database', error);
            throw error;
        }
    }
}

export default ApiService;
