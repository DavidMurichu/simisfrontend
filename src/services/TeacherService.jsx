import BaseLink from "./baselink";
import axios from "axios";

const BASE_URL = BaseLink.getBaseLink();
class TeacherService {

    static async getAllPersons() {
        try {
            const endpoint ='home/get_data/sch_teachers';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            console.log(response)
            return response;
        }
        catch (err){
            console.log("err fetching persons")
        }
    }

    static async deletePerson(id) {
        
    }

    static async getPersonById(id) {

    }

    static async addPerson(personData) {
        try {
            const endpoint = "home/add_data/sch_teachers";
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,personData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': true,
                    },
                });
            console.log(response.data);
            return response;
        }catch (err){
            throw err;
        }
        
    }

    static async updatePerson(id, personData) {
        
    }

    static async deleteTeacherOnDuty(id) {
        
    }

    static async addTeacherOnDuty(teacherData) {
        try {
            const endpoint = 'home/add_data/sch_teacher_on_duties';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,teacherData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': true,
                    },
                });
            console.log(response.data);
            return response;
        }catch (err){
            throw err;
        }

    }
}
export default TeacherService;