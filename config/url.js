const API_BASE_URL_LOCAL = "http://localhost:5501";
const API_BASE_URL_PROD = "https://api.cleanquick.cl";

let API_URL = '';

let hostName = window.location.hostname;

if (hostName === 'localhost' || hostName === '127.0.0.1') {
    API_URL = API_BASE_URL_LOCAL
} else {
    API_URL = API_BASE_URL_PROD
}

export default API_URL