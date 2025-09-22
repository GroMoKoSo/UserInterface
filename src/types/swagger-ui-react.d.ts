declare module "swagger-ui-react" {
    import { ComponentType } from "react";

    export interface SwaggerUIProps {
        url?: string;
        spec?: object;
        dom_id?: string;
        presets?: any[];
        layout?: string;
        docExpansion?: string;
        defaultModelsExpandDepth?: number;
        defaultModelExpandDepth?: number;
        defaultModelRendering?: string;
        displayRequestDuration?: boolean;
        filter?: boolean | string;
        deepLinking?: boolean;
        showExtensions?: boolean;
        showCommonExtensions?: boolean;
        tryItOutEnabled?: boolean;
    }

    const SwaggerUI: ComponentType<SwaggerUIProps>;

    export default SwaggerUI;
}
