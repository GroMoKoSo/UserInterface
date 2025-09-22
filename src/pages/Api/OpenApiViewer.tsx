
import { Title, useMantineColorScheme } from '@mantine/core';
import SwaggerUI from "swagger-ui-react"

export function OpenApiViewer() {
    const { setColorScheme } = useMantineColorScheme();
    setColorScheme('light')
    return (
        <>
            <Title>Api's</Title>


            <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" />
        </>
    );
}
