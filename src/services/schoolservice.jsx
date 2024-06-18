import BaseLink from "./baselink";
import axios from "axios";

const BASE_URL = BaseLink.getBaseLink();
class SchoolService {


    static async addSchoolService(schoolServiceData) {
        try {
            const endpoint = 'home/add_data/sch_service_durations';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,schoolServiceData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            console.log(response);
            return response;
        }catch (err){
            console.log("Error adding school service")
        }
    }

    static async getSchoolService() {
        try {
            const endpoint = '';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            console.log(response);
            return response;
        }catch (err){
            console.log("Error adding school service")
        }
    }

    static async createSchoolService(formData) {
        try {
            const endpoint = 'home/add_data/sch_services';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`, formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            return response;
        }catch (err){
            console.log("Error adding school service");
        }

    }

    static async fetchServiceDurations() {
        try {
            const endpoint = 'home/get_data/sch_service_durations';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            console.log(response);
            return response;
        }catch (err){
            console.log("Error adding school service")
        }
    }

    static async fetchPaymentTerms() {
        try {
            const endpoint = 'home/get_data/sch_payment_terms';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`, {
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
}
export default SchoolService;
