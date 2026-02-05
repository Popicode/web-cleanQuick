const API_BASE_URL_LOCAL = "https://www.cleanquick.cl";
const API_BASE_URL_PROD = "https://www.cleanquick.cl";

let API_URL = '';

let hostName = window.location.hostname;

if (hostName === 'localhost' || hostName === '127.0.0.1') {
    API_URL = API_BASE_URL_LOCAL
} else {
    API_URL = API_BASE_URL_PROD
}

export default API_URL