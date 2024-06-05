import axios from "axios";
import BaseLink from "./baselink";

const BASE_URL = BaseLink.getBaseLink();
class ClassesService {
    static async getAllClasses() {
        try {
            const endpoint = 'home/get_data/sch_classes';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': true,
                    },
                })
            console.log(response.data)
            return response;
        }catch (err){
            console.log("Error fetching classes ", err)
        }

    }

    static async addClass(classData) {
        try {
            const endpoint = 'home/add_data/sch_classes';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`, classData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            console.log("Response data ", response.data);
            return response;
        }catch (err){
            console.log("Error getting the class data ", err);
        }

    }

    static async addClassDailyRecording(recordingData) {
        try {
            const endpoint = 'home/add_data/sch_class_daily_recordings';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`, recordingData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            console.log("Response data ", response.data);
            return response;
        }catch (err){
            console.log("Error getting the class data ", err);
        }
    }
}
export default ClassesService;