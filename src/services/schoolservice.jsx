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
}
export default SchoolService;