const serverUrl = 'http://127.0.0.1:8000'
const apiEntry = '/api/v1/'

// authentication endpoints
export const loginUrl = `${serverUrl}${apiEntry}auth/jwt/create/`
export const registerUrl = `${serverUrl}${apiEntry}auth/users/`
