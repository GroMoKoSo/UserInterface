import { Button, Center, Text, Image, Stack, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";


export function NotFoundPage() {

    const navigate = useNavigate();
    return (
        <Center w={"100%"} h={"90vh"}>
            <div
                style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}
            >
                <Image src={"404.png"} h={"600"} fit={"contain"} />
                <Stack align="center" p={"sm"}>

                    <Text 
                    variant="gradient"
                    gradient={{ from: '#465c7f', to: 'black', deg: 180 }}
                    style={{
                        fontSize: "40vh",
                        height: "50vh",
                        fontWeight: 700,
                        padding: 0
                        
                    }}
                    >
                        404
                    </Text>

                    <Title style={{
                        color: "#465c7f"
                    }}
                    >
                        The requested page was not found.
                    </Title>

                    <Button
                        color="#465c7f"
                        mb={"xl"}
                        onClick={() => navigate('/')}
                    >
                        Go back to Home
                    </Button>
                </Stack>

            </div>
        </Center>
    )
}