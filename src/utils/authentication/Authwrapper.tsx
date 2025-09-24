import { AggregatedUserT } from "@/types/Types.js";
import { createContext, useEffect, useState } from "react";
import keycloak from "./keycloak.js";
import { routes, RouteT } from "./routes.js";


type SessionContextType = {
    keycloak: typeof keycloak | null;
    user: AggregatedUserT | null;
    setUser: React.Dispatch<React.SetStateAction<AggregatedUserT | null>>;
    permittedRoutes: RouteT[];
};

export const SessionContext = createContext<SessionContextType | null>({
    keycloak: null,
    user: null,
    setUser: () => { },
    permittedRoutes: [],
});

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AggregatedUserT | null>(null);
    const [permittedRoutes, setPermittedRoutes] = useState<RouteT[]>([]);

    async function fetchAggregatedUserInfo(username: string): Promise<AggregatedUserT> {
        // Mocked user info TODO: replace with actual API call

        let role = sessionStorage.getItem("role");
        if (role !== "admin" && role !== "member") {
            sessionStorage.setItem("role", "member");
            role = "member";
        }
        return Promise.resolve({
            firstName: "Mock",
            lastName: "User",
            name: "Mock User",
            username: "mockuser",
            email: "mockuser@example.com",
            systemrole: role === "admin" ? "system-admin" : "system-member",
            accessibleApis: [],
            groupMemberships: [],
        });
    }

    useEffect(() => {
        // Prevent multiple initializations
        if ((keycloak as any).initialized) {
            console.log("Keycloak already initialized.");
            return;
        }

        console.log("Initializing Keycloak...");
        keycloak.init({ onLoad: 'login-required' })
            .then(authenticated => {
                (keycloak as any).initialized = true;
                if (authenticated) {
                    keycloak.loadUserInfo().then((userInfo: { preferred_username?: string; [key: string]: any }) => {
                        console.log("User Info:", userInfo);
                        const username = userInfo.preferred_username || "unknown";
                        fetchAggregatedUserInfo(username)
                            .then(fetchedUser => {
                                setUser(fetchedUser);
                                setPermittedRoutes(routes.filter((r) => r.adminOnly ? fetchedUser.systemrole === "system-admin" : true))
                                console.log("Fetched User:", fetchedUser);
                            })
                            .catch(err => {
                                console.error("Failed to fetch user info from backend", err);
                            });
                    });
                } else {
                    console.warn("User is not authenticated");
                }
            })
            .catch(err => {
                console.error("Failed to initialize Keycloak", err);
            });
    }, [])


    return (
        <SessionContext.Provider value={{ user, keycloak, setUser, permittedRoutes}}>
            {children}
        </SessionContext.Provider>
    );
}


