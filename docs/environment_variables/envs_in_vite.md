# Environment Variables in Vite (Containerized Setup)

This document summarizes how and when environment variables can be accessed in a Vite project, especially when running inside containers.

---

## 1. Build-Time in `vite.config.ts`

- Vite config runs in **Node.js** at build time.
- You can access envs using:
  - `process.env`
  - `loadEnv` (loads `.env` files automatically)

```ts
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // load all envs

  return {
    define: {
      __APP_VERSION__: JSON.stringify(env.APP_VERSION),
    },
    server: {
      port: parseInt(env.PORT ?? '5173'),
    },
  }
})
```

⚠️ Limitation: These envs are baked into the build. Changing them requires rebuilding.

---

## 2. Build-Time in Source Code

- Vite automatically exposes only envs prefixed with `VITE_`.
- They are available via `import.meta.env`.

```ts
console.log(import.meta.env.VITE_API_URL) // your custom API
console.log(import.meta.env.MODE)         // "development" | "production"
console.log(import.meta.env.BASE_URL)     // base public path
```

### Setting Environment Variables

1. **Using `.env` Files**  
    Create a `.env` file in your project root and define variables with the `VITE_` prefix:

    ```env
    VITE_API_URL=https://api.example.com
    VITE_APP_NAME=MyApp
    ```

    Vite automatically loads these variables based on the mode:
    - `.env` (default for all modes)
    - `.env.development` (specific to development mode)
    - `.env.production` (specific to production mode)

2. **Using `process.env` in `vite.config.ts`**  
    You can also set variables dynamically in your `vite.config.ts` file:

    ```ts
    import { defineConfig } from 'vite'

    export default defineConfig(() => {
      return {
         define: {
            'import.meta.env.VITE_CUSTOM_VAR': JSON.stringify(process.env.CUSTOM_VAR),
         },
      }
    })
    ```

3. **Environment Variables in CI/CD**  
    Set `VITE_` variables directly in your CI/CD pipeline or shell:

    ```sh
    export VITE_API_URL=https://api.example.com
    npm run build
    ```

⚠️ Limitation: Only variables with the `VITE_` prefix are exposed to the browser.  
Everything is still fixed at build time.

---

## 3. Runtime (Containerized Setup)

When serving the already built static assets (e.g. via Nginx), you cannot change baked envs.  
To make envs configurable at runtime (after `docker run`), you need to inject them dynamically.

### Example: Entrypoint Script

```sh
#!/bin/sh
# entrypoint.sh
cat <<EOF > /usr/share/nginx/html/env.js
window.ENV = {
    BASE_URL: "${BASE_URL}",
    API_URL: "${API_URL}"
}
EOF

exec nginx -g "daemon off;"
```

- `docker run -e BASE_URL=https://example.com -e API_URL=https://api.example.com ...`
- Generates `/usr/share/nginx/html/env.js` at container start.
- The app loads `env.js` and reads:

```js
console.log(window.ENV.BASE_URL)
console.log(window.ENV.API_URL)
```

✅ This allows runtime configuration without rebuilding the image.

---

## 4. Alternatives

- **Backend endpoint**: Serve `/config.json` with envs → fetch in app.  
- **Mounted config files / secrets**: Map into container → app loads them.  
- **Reverse proxy injection**: Inject headers or JS variables through Nginx or another proxy.  

---

## Summary

| Context        | Access Method             | When Available        | Limitation                                |
|----------------|---------------------------|-----------------------|-------------------------------------------|
| Vite config    | `process.env` / `loadEnv` | Build time (Node)     | Requires rebuild if changed                |
| Source code    | `import.meta.env.VITE_*`  | Build time (Browser)  | Only `VITE_*` vars, requires rebuild       |
| Runtime (cont.)| `window.ENV` via entrypoint| Run time (Browser)   | Requires custom injection mechanism        |
