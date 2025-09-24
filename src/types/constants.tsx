declare global {
    interface Window {
        ENV?: { 
            VITE_BASE_URL?: string 
            VITE_KEYCLOAK_URL?: string
            VITE_USERMANAGEMENT_URL?: string
            VITE_APIMANAGEMENT_URL?: string
        };
    }
}

export const BASE_URL = window.ENV?.VITE_BASE_URL ?? import.meta.env.VITE_BASE_URL;
export const KEYCLOAK_URL = window.ENV?.VITE_KEYCLOAK_URL ?? import.meta.env.VITE_KEYCLOAK_URL
export const USERMANAGEMENT_URL = window.ENV?.VITE_USERMANAGEMENT_URL ?? import.meta.env.VITE_USERMANAGEMENT_URL
export const APIMANAGEMENT_URL = window.ENV?.VITE_APIMANAGEMENT_URL ?? import.meta.env.VITE_APIMANAGEMENT_URL

export const KEYCLOAK_REALM = "gromokoso"
export const KEYCLOAK_CLIENT_ID = "user-interface"
