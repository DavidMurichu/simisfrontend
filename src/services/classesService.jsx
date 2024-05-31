import axios from "axios";

const BASE_URL = 'https://ca92-102-219-210-246.ngrok-free.app';

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
}
export default ClassesService;