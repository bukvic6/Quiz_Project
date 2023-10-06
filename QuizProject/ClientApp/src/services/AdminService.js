
import api from "./InterceptorService";
const ADMIN_API = `https://localhost:7192/api/Admin`;


class AdminService {
    getQuestions() {
        return api.get(ADMIN_API);
    }
    createQuestion(question) {
        return api.post(ADMIN_API + "/createQuestion", question)
    }
    deleteQuestion(id) {
        return api.delete(`${ADMIN_API}/delete/${id}`)
    }
    updateQuestion(question) {
        return api.post(ADMIN_API + "/updateQuestion", question)
    }
}
export default new AdminService()