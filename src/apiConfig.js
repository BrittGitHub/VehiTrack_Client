let apiUrl
const apiUrls = {
  production: 'https://brittgithub.github.io/VehiTrack_Client',
  development: 'http://localhost:8000'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
