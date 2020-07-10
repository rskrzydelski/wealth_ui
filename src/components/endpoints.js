const serverUrl = 'http://127.0.0.1:8000'
const apiEntry = '/api/v1/'

// authentication endpoints
export const loginUrl = `${serverUrl}${apiEntry}auth/jwt/create/`
export const registerUrl = `${serverUrl}${apiEntry}auth/users/`

// market prices
export const gold999ozUrl = `${serverUrl}${apiEntry}market?name=gold999&unit=oz`
export const gold999gUrl = `${serverUrl}${apiEntry}market?name=gold999&unit=g`
export const gold999kgUrl = `${serverUrl}${apiEntry}market?name=gold999&unit=kg`

export const gold585ozUrl = `${serverUrl}${apiEntry}market?name=gold585&unit=oz`
export const gold585gUrl = `${serverUrl}${apiEntry}market?name=gold585&unit=g`
export const gold585kgUrl = `${serverUrl}${apiEntry}market?name=gold585&unit=kg`

export const gold333ozUrl = `${serverUrl}${apiEntry}market?name=gold333&unit=oz`
export const gold333gUrl = `${serverUrl}${apiEntry}market?name=gold333&unit=g`
export const gold333kgUrl = `${serverUrl}${apiEntry}market?name=gold333&unit=kg`

export const silver999ozUrl = `${serverUrl}${apiEntry}market?name=silver999&unit=oz`
export const silver800gUrl = `${serverUrl}${apiEntry}market?name=silver800&unit=g`
