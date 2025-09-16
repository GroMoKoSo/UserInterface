
import { Title, useMantineColorScheme } from '@mantine/core';

import SwaggerEditor from "swagger-editor";


export function ApisPage() {

  return (
    <>
      <Title>Api's</Title>
      

      <div style={{ height: "100vh" }}>
        <SwaggerEditor url="/openapi.yaml" />
      </div>
    </>
  );
}

