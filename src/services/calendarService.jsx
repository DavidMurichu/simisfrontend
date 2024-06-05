import axios from "axios";
import BaseLink from "./baselink";
const BASE_URL = BaseLink.getBaseLink();
class CalendarService {

    static async getAllAcademicYears() {
       try {
           const endpoint = 'home/get_data/sch_academic_years';
           const token = sessionStorage.getItem("token");
           const response = await axios.get(`${BASE_URL}/${endpoint}`,{
               headers: {
                   'Authorization': `Bearer ${token}`,
                   'ngrok-skip-browser-warning': true,
               },
           })
           console.log(response);
           return response;
       }catch (err){
           console.log("Error fetching endpoint")
       }
    }

    static async getAllTerms() {
        try {
            const endpoint ='home/get_data/sch_terms';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            })
            console.log(response)
            return response;
        }catch (err){
            console.log("Error on creating a new term");
        }
    }

    static async getAllEvents() {

    }

    static async createTerm(termData) {
        try {
            const endpoint ='home/add_data/sch_terms';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,termData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            })
            console.log(response.data)
            return response;
        }catch (err){
            console.log("Error on creating a new term");
        }
    }

    static async createAcademicYear(academicYearData) {
        try {
            const endpoint ='home/add_data/sch_academic_years';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,academicYearData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            })
            console.log(response.data)
            return response;
        }catch (err){
            console.log("Error on creating a new term");
        }
    }

    static async getAllCalendarYears() {
          try {
              const endpoint = 'home/get_data/sys_years';
              const token = sessionStorage.getItem("token");
              const response = await axios.get(`${BASE_URL}/${endpoint}`,{
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'ngrok-skip-browser-warning': true,
                  },
              })
              console.log(response)
              return response;
          }catch (err){
              console.log("Error fetching calendar year")
          }
    }

    static async createCalendarYear(calendarYearData) {
        try {
            const endpoint = 'home/add_data/sys_years';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`, calendarYearData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            })
            console.log(response)
            return response;
        }catch (err){
            console.log("Error creating calendar ", err)
        }

    }

    static async getAllAcademicYearTerms() {
        try {
            const endpoint ='home/get_data/sch_academic_year_terms';
            const token = sessionStorage.getItem("token");
            const response  = await axios.get(`${BASE_URL}/${endpoint}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            })
            console.log(response)
            return response;
        }catch (err){
            console.log("Error fetching academic year terms", err);
        }
    }

    static async createAcademicYearTerm(dataToSubmit) {
        try {
            const endpoint = 'home/add_data/sch_academic_year_terms';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,dataToSubmit,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            })
            console.log(response)
            return response;
        }catch (err){
            console.log("Error adding academic year term ", err)
        }

    }

    static async getClassTerms() {
        try {
            const endpoint = 'home/get_data/sch_student_class_terms';
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            })
            console.log(response)
            return response;
        }catch (err){
            console.log("Error adding academic year term ", err)
        }
    }

    static async addClassTerm(newTerm) {

        try {
            const endpoint = 'home/add_data/sch_student_class_terms';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,newTerm,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            })
            console.log(response)
            return response;
        }catch (err){
            console.log("Error adding academic year term ", err)
        }
    }

    static async deleteAcademicYearTerm(id) {

    }

    static async deleteAcademicYear(id) {
        
    }

    static async deleteClassTerm(id) {

    }

    static async deleteCalendarYear(id) {

    }

    static async deleteTerm(id) {
        
    }
}
export default CalendarService;