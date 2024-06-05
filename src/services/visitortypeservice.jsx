import BaseLink from "./baselink";
import axios from "axios";

const BASE_URL = BaseLink.getBaseLink();
class VisitorTypeService {

    static async addVisitorType(visitorTypeData) {
        try {
            const endpoint = 'home/add_data/sch_visitor_types';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,visitorTypeData,
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

    static async deleteVisitor(id) {
        
    }

    static async addVisitor(visitorData) {
        try {
            const endpoint = 'home/add_data/sch_visitor_registers';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,visitorData,
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

    static async getAllVisitorTypes() {
        try {
            const endpoint = 'home/get_data/sch_visitor_types';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`,
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
}export default VisitorTypeService;