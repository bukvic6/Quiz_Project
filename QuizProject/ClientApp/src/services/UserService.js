import api from "./InterceptorService";
import axios from "axios";

const USER_API = `https://localhost:7192/api/User`;

class UserService {
    answerQuestion(answer) {
        return api.post(USER_API + "/calculate-score", answer)
    }
    getQuestions() {
        return api.get(USER_API)
    }
    getResults() {
        return axios.get(USER_API + "/results")
    }
}
export default new UserService()