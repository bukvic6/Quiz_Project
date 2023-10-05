import axios from "axios";
const AUTH_API = `https://localhost:7192/api/Auth`;

class AuthService {
    Login(userDTO)
    {
        return axios.post(AUTH_API + "/login", userDTO)
    }
}
export default new AuthService()