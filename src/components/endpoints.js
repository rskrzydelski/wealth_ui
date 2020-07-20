const serverUrl = 'http://127.0.0.1:8000'
const apiEntry = '/api/v1/'

// authentication endpoints
export const loginUrl = `${serverUrl}${apiEntry}auth/jwt/create/`
export const refreshTokenUrl = `${serverUrl}${apiEntry}auth/jwt/refresh/`
export const registerUrl = `${serverUrl}${apiEntry}auth/users/`
export const accountUrl = `${serverUrl}${apiEntry}auth/users/me/`

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

// wallet
export const walletGold999Url = `${serverUrl}${apiEntry}wallet/metals/gold999`
export const walletGold585Url = `${serverUrl}${apiEntry}wallet/metals/gold585`
export const walletGold333Url = `${serverUrl}${apiEntry}wallet/metals/gold333`
export const walletSilver999Url = `${serverUrl}${apiEntry}wallet/metals/silver999`
export const walletSilver800Url = `${serverUrl}${apiEntry}wallet/metals/silver800`
export const walletCashUrl = `${serverUrl}${apiEntry}wallet/cash`
export const walletUrl = `${serverUrl}${apiEntry}wallet`

// resources
export const metalsUrl = `${serverUrl}${apiEntry}resources/metals`
export const metalsGold999Url = `${serverUrl}${apiEntry}resources/metals?name=gold999`
export const metalsGold585Url = `${serverUrl}${apiEntry}resources/metals?name=gold585`
export const metalsGold333Url = `${serverUrl}${apiEntry}resources/metals?name=gold333`
export const metalsSilver999Url = `${serverUrl}${apiEntry}resources/metals?name=silver999`
export const metalsSilver800Url = `${serverUrl}${apiEntry}resources/metals?name=silver800`
export const cashUrl = `${serverUrl}${apiEntry}resources/cash`

