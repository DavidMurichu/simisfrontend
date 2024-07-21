import axios from "axios";
import BaseLink from "./baselink";
import {toast} from "react-toastify";
const BASE_URL = BaseLink.getBaseLink();
class Pupilservice {
    static async getAllSystemGenders() {
        try {
            const endpoint = 'home/get_data/sys_genders';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': true,
                    },
                })
            console.log("response ", response);
            return response;
        }catch (err){
            console.log("Error fetching the genders" +
                "")
        }
    }

    static async getAllGenders() {
        try {
            const endpoint = 'home/get_data/sch_student_genders';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': true,
                    },
                })
            console.log("response ", response);
            return response;
        }catch (err){
            console.log("Error fetching the genders" +
                "")
        }
    }

    static async addGender(genderData) {
        try {
            const endpoint = 'home/add_data/sch_student_genders';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,genderData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': true,
                    },
                })
            console.log("response ", response);
            return response;
        }catch (err){
            console.log("Error fetching the genders",err)
        }
    }

    static async addPupil(formData) {
        try {
            const endpoint = 'home/add_data/sch_students';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            return response;
        } catch (err) {
            if (err.response) {
                throw err.response;
            } else if (err.request) {
                throw new Error("No response received. Please try again.");
            } else {
                throw new Error("Error: " + err.message);
            }
        }

}

    static async getAllPupils() {
        try {
            const endpoint = 'home/get_data/sch_students'
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            console.log(response)
            return response;
        }catch (err){
            console.log("Error adding pupil to database")
        }
    }

    static async promotePupil(promotionData) {
        try {
            const endpoint = 'home/student_transition/sch_student_class_promotions';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,promotionData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            console.log(response);
            return response;
        }catch (err){
            console.log("Error promoting pupil work load", err);
            return err
        }

    }

    static async getPromotedPupil() {
        try {
            const endpoint = 'home/get_data/sch_student_class_promotions';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            console.log(response);
            return response;
        }catch (err){
            console.log("Error promoting pupil", err);
        }
    }

    static async deleteGender(id) {

    }

    static async deletePupil(id) {

    }

    static async getPupilById(id) {
        try {
            const endpoint = `home/get_data/sch_students/${id}`
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            console.log(response)
            return response;
        }catch (err){
            console.log("Error adding pupil to database")
        }
    }

    static async demotePupil(selectedPupilData) {
        try {
            const endpoint = 'home/student_transition/sch_demoted_students';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,selectedPupilData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            console.log(response);
            return response;
        }catch (err){
            console.log("Error promoting pupil", err);
        }
    }

    static async reportPupil(selectedPupilData) {
        try {
            const endpoint = 'home/add_data/sch_student_class_terms';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,selectedPupilData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            console.log(response);
            return response;
        }catch (err){
            console.log("Error promoting pupil", err);
        }

    }

    static async deleteReportedPupil(id) {

    }

    static async getPromotedForReporting() {
        try {
            const endpoint = 'home/get_non_reported_students';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            return response;
        }catch (err){
            console.log("Error promoting pupil", err);
        }
    }

    static async getReportedStudent() {
        try {
            const endpoint = 'home/promoted/students/sch_student_class_terms';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            return response;
        }catch (err){
            console.log("Error promoting pupil", err);
        }
    }
}
export default Pupilservice
