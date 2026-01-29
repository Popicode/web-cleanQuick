const API_BASE_URL_LOCAL = "https://servidor-cleanquick.onrender.com";
const API_BASE_URL_PROD = "https://servidor-cleanquick.onrender.com";

let API_URL = '';

let hostName = window.location.hostname;

if (hostName === 'localhost' || hostName === '127.0.0.1') {
    API_URL = API_BASE_URL_LOCAL
} else {
    API_URL = API_BASE_URL_PROD
}

export default API_URL