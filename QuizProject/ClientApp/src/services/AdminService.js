
import api from "./InterceptorService";
const ADMIN_API = `https://localhost:7192/api/Admin`;


class AdminService {
    getQuestions(pn, ps, search) {
        return api.get(`${ADMIN_API}/${pn}/${ps}`, {
            params: {
                search: search
            }
        });
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

    getCount(search) {
        return api.get(`${ADMIN_API}/count`, {
            params: {
                search: search
            }
        });
    }

    getResultCount() {
        return api.get(ADMIN_API + "/resultCount")
    }
    getUserCount() {
        return api.get(ADMIN_API + "/userCount")
    }

    getResults(pn, ps, startDate, endDate) {
        return api.get(`${ADMIN_API}/results/${pn}/${ps}`, {
            params: {
                startDate: startDate,
                endDate: endDate,
            }
        });
    }
    getStatistic() {
        return api.get(ADMIN_API + "/statistic")
    }

    getUsers(pn, ps, search) {
        return api.get(`${ADMIN_API}/users/${pn}/${ps}`, {
            params: {
                search: search
            }
        });
    }

}
export default new AdminService()