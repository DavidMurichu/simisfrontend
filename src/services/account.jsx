import axios from 'axios';
import BaseLink from "./baselink";

const BASE_URL = BaseLink.getBaseLink();
class Account {
    static async login(email, password) {
        try {
            const endpoint = 'auth/login';
            const response =
                await axios.post(`${BASE_URL}/${endpoint}`, {email:email, password:password},{
                headers: {
                    'ngrok-skip-browser-warning': true,
                }
            });
            let decodedToken;
            if (response.data.active === 1){
                decodedToken = parseJwt(response.data.token);
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("role", decodedToken.role);
                sessionStorage.setItem("active", decodedToken.active);
                sessionStorage.setItem("id", decodedToken.user_id);
                sessionStorage.setItem("username", decodedToken.username);
                const expiration = decodedToken.exp * 1000;
                const logoutTimeout = Math.min(expiration - Date.now(), 30 * 60 * 1000);
                setTimeout(logout, logoutTimeout);
                console.log(response.data.token);
            }

            return response.data;
        } catch (error) {
            throw new Error(`Authentication failed: ${error.message}`);
        }
    }
    static async verify2FA(code) {
        try {
            const endpoint = 'auth/2FAcode';
            const response = await axios.post(`${BASE_URL}/${endpoint}`,
                { code: code },
                {
                headers: {
                    'ngrok-skip-browser-warning': true,
                }
            });
            console.log(response)
            const decodedToken = parseJwt(response.data.token);
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("role", decodedToken.branch_name);
            sessionStorage.setItem("active", decodedToken.active);
            sessionStorage.setItem("id", decodedToken.user_id);
            sessionStorage.setItem("username", decodedToken.username);
            const expiration = decodedToken.exp * 1000;
            const logoutTimeout = Math.min(expiration - Date.now(), 30 * 60 * 1000);
            setTimeout(logout, logoutTimeout);
            return response.data;
        } catch (error) {
            console.error('2FA verification failed:', error);
            throw error;
        }
    }
    s
    // static getCsrfToken() {
    //     const endpoint = 'auth/csrf_token';
    //     return await axios.get(`${BASE_URL}/${endpoint}`,
    //         {
    //             headers: {
    //                 'ngrok-skip-browser-warning': true,
    //             }
    //         });
    // }
    static async addUserByAdminId(userData) {
        try {
            const endpoint = 'auth/register';
            console.log(userData);
            const response = await axios.post(`${BASE_URL}/${endpoint}`,
                userData, {
                    headers: {
                        'ngrok-skip-browser-warning': true,
                    }
                });
            return response.data;
        } catch (error) {
            console.error('Error adding user to database', error);
            throw error;
        }
    }
    static async getAllUsers(){
        try {
            const endpoint = "home/get_data/users";
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
    static async getClientInfo() {
        try {
            const endpoint = "home/get_data/clients";
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': true,
                    },
                });
            console.log(response)
            return response;
        }catch (e) {
            console.log("error getting client info" + e)
        }
    }
    static async updateClientInfo(id, clientInfo) {
        try {
            const endpoint = `auth/edit/clients`;
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,
                {id,clientInfo}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            return response.data;
        } catch (err) {
            console.log("error updating client info: " + err);
        }
    }
    static async getAllAudits() {
        try {
            const endpoint = `home/get_data/audits`;
            const token = sessionStorage.getItem("token");
            const response  = await axios.get(`${BASE_URL}/${endpoint}`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                },
            });
            console.log(response.data);
            return response;
        }catch (err) {
            console.log("Error fetching audits ", err);
        }
    }

    static async getAllBranches() {
        try {
            const endpoint = 'home/get_data/auth_branches'
            const token  = sessionStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/${endpoint}`, {
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': true,
                }
            })
            console.log(response.data)
            return response;
        }catch (err){
            console.log("Error fetching branches, ",err);
        }
    }

    static async addRoleByAdminId(roleData) {
        try {
            const endpoint = 'home/add_data/auth_branches';
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/${endpoint}`,roleData,{
                headers:{
                    'ngrok-skip-browser-warning': true,
                }
            });
         console.log(response.data);
         return response;
        }catch (err){
            console.log("Error adding role, ", err);
        }

    }

    static async getRoleById(roleId) {
        
    }

    static async updateRoleByAdminId(createdBy, roleId, roleData) {
        
    }
}
export const logout = async () => {
    try {
        const token = sessionStorage.getItem("token");
        if (!token) {
            throw new Error("No token found in sessionStorage");
        }
        await axios.post(`${BASE_URL}/auth/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'ngrok-skip-browser-warning': true,
            }
        });
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("username");
    } catch (error) {
        console.error('Error logging out', error);
        throw new Error(`Error logging out: ${error.message}`);
    }
};

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error decoding JWT token", error);
        throw new Error(`Error decoding JWT token: ${error.message}`);
    }
}
export default Account;
