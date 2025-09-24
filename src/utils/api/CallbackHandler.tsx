import { KEYCLOAK_URL } from "@/types/constants.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function CallbackHandler() {

    const navigate = useNavigate();

    async function exchangeCodeForTokens() {
        debugger
        const code = new URLSearchParams(window.location.search).get('code'); 
        const code_verifier = sessionStorage.getItem('code_verifier');  

        if (!code || !code_verifier) {
            console.error('Missing code or code_verifier');
            return;
        }

        const client_id = 'user-interface';
        const redirect_uri = `${window.location.origin}/callback`;
        const tokenEndpoint = `${KEYCLOAK_URL}/realms/gromokoso/protocol/openid-connect/token`;

        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id,
            code,
            redirect_uri,
            code_verifier
        });

        try {
            const response = await fetch(tokenEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Token request failed:', errorData);
                return;
            }

            const tokens = await response.json();

            sessionStorage.setItem('access_token', tokens.access_token);
            sessionStorage.setItem('id_token', tokens.id_token);
            sessionStorage.setItem('refresh_token', tokens.refresh_token);

            navigate("/");

        } catch (err) {
            console.error('Error exchanging code for tokens:', err);
            navigate("/login");
        }
    }

    useEffect(() => {
        exchangeCodeForTokens();
    }, []);


    return (<>if you can read this, the authentication failed badly</>)
}