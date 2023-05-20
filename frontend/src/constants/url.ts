const isDevelopmnet = import.meta.env.MODE === 'development'

export const API_URL = isDevelopmnet ? 'http://localhost:7080/api' : '/api'

export const BASE_URL = isDevelopmnet ? 'http://localhost:7080/' : '/'