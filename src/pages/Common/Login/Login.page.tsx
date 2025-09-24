import { Title, Text, Anchor, Paper, Button, Container, Center } from "@mantine/core";
import classes from "./Login.module.css"

import { SessionContext } from "@/utils/authentication/Authwrapper.js";
import { KEYCLOAK_URL } from "@/types/constants.js";
import { useContext } from "react";

export function LoginPage() {

    // helper functions
    async function generateCodeChallenge(verifier: string) {
        const encoder = new TextEncoder();
        const data = encoder.encode(verifier);
        const hash = await crypto.subtle.digest('SHA-256', data);
        const base64String = btoa(String.fromCharCode(...new Uint8Array(hash)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        return base64String;
    }

    function generateCodeVerifier(length = 128) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    async function handleLoginClick() {
        const client_id = 'user-interface';
        const redirect_uri = encodeURIComponent(`${window.location.origin}/callback`);
        const response_type = 'code';
        const scope = 'openid';
        const code_verifier = generateCodeVerifier();
        const code_challenge = await generateCodeChallenge(code_verifier);
        const code_challenge_method = 'S256';

        // Speichere den code_verifier z.B. im SessionStorage, um ihn später beim Token-Austausch zu nutzen
        sessionStorage.setItem('code_verifier', code_verifier);

        const realm = 'gromokoso';
        const slug = `/protocol/openid-connect/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_method}`;

        window.location.href = `${KEYCLOAK_URL}/realms/${realm}${slug}`;
    }

    return (
        <Center h={"90vh"}>
            <Container size={420} my={40}>

                <Title ta="center" className={classes.title}>
                    Welcome to Gromokoso!
                </Title>

                <Text className={classes.subtitle} mt={"md"}>
                    Do not have an account yet? <Anchor href={`${KEYCLOAK_URL}/realms/gromokoso/protocol/openid-connect/registrations`}>Create account</Anchor>
                </Text>

                <Paper withBorder shadow="sm" p={22} mt={"sm"} radius="md">


                    <Button
                        fullWidth
                        radius="md"
                        variant="outline"
                        onClick={handleLoginClick}
                    >
                        Login with Keycloak
                    </Button>

                    <Button
                        fullWidth
                        radius="md"
                        mt={"md"}
                        variant="outline"
                        onClick={() => {}}
                    >
                        Logout
                    </Button>

                </Paper>

            </Container>
        </Center>
    )
}