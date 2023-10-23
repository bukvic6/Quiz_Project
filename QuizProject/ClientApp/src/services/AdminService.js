
import api from "./InterceptorService";
const ADMIN_API = `https://localhost:7192/api/Admin`;


class AdminService {
    getQuestions(pn,ps) {
        return api.get(`${ADMIN_API}/${pn}/${ps}`);
    }
    createQuestion(question) {
        return api.post(ADMIN_API + "/createQuestion", question)
    }
    deleteAnswer(answersToDelete) {
        return api.post(`${ADMIN_API}/deleteAnswer`, answersToDelete)
    }
    deleteQuestion(id) {
        return api.delete(`${ADMIN_API}/delete/${id}`)
    }
    updateQuestion(question) {
        return api.post(ADMIN_API + "/updateQuestion", question)
    }
    getCount() {
        return api.get(ADMIN_API + "/count")
    }
    getResults(pn, ps) {
        return api.get(`${ADMIN_API}/results/${pn}/${ps}`)
    }
}
export default new AdminService()