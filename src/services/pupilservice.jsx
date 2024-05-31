import axios from "axios";

const BASE_URL = 'https://ca92-102-219-210-246.ngrok-free.app';
class Pupilservice {
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
            const response = await axios.post(`${BASE_URL}/${endpoint}`,formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            return response.data;
        }catch (err){
            console.log("Error adding pupil to database")
        }

    }

    static async getAllPupils() {
        try {
            const endpoint = 'home/get_data/sch_students '
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
            const endpoint = 'home/add_data/sch_student_class_promotions';
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
            console.log("Error promoting pupil", err);
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
}
export default Pupilservice