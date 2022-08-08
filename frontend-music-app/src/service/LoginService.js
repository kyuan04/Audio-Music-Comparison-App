import axios from 'axios'

const LOGIN_API_URL = 'http://localhost:8080'
const FIND_USER_API_URL = '${LOGIN_API_URL}/api/v1/login/users'
const CREATE_USER_API_URL = '${LOGIN_API_URL}/api/v1/login/users'

class LoginService {

    queryUserBy(username, password) {
        console.log(username);
        return axios.get(`${FIND_USER_API_URL}`, {params: { username: username, password: password}})
    }

    createUser(username, password, email, zipCode, firstName, lastName) {
        console.log(username);
        return axios.post(`${CREATE_USER_API_URL}`,
            {
                username,
                password,
                email,
                zipCode,
                firstName,
                lastName
            })
    }


}

export default new LoginService()