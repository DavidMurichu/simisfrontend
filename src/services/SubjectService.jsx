import BaseLink from "./baselink";
import axios from "axios";

const BASE_URL = BaseLink.getBaseLink();
class SubjectService {

    static async getAllSubjects() {

    }

    static async getSubjectById(id) {
        
    }

    static async addSubject(subjectData) {
        try {
            const endpoint = "home/add_data/sch_subjects ";
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,subjectData,
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

    static async deleteSubject(id) {

    }
}
export default SubjectService;