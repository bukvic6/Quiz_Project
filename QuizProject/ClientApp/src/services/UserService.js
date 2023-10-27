﻿import api from "./InterceptorService";
const USER_API = `https://localhost:7192/api/User`;

class UserService {
    getQuestions() {
        return api.get(USER_API)
    }

    answerQuestion(answer) {
        return api.post(USER_API + "/calculate-score", answer)
    }

    getTopFive(topNumber) {
        return api.get(`${USER_API}/topResults/${topNumber}`)
    }

    getUserResults(pn, ps) {
        return api.get(`${USER_API}/userResults/${pn}/${ps}`)
    }

    getResultCount() {
        return api.get(USER_API + "/count")
    }
}
export default new UserService()