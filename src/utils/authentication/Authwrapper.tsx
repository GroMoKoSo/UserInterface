import { AggregatedUserT } from "@/types/Types.js";
import { createContext, useEffect, useState } from "react";
import keycloak from "./keycloak.js";
import { routes, RouteT } from "./routes.js";
import { getAggregatedUser } from "../api/UserApiService.js";


type SessionContextType = {
    keycloak: typeof keycloak | null;
    user: AggregatedUserT | null;
    setUser: React.Dispatch<React.SetStateAction<AggregatedUserT | null>>;
    permittedRoutes: RouteT[];
};

export const SessionContext = createContext<SessionContextType>({
    keycloak: null,
    user: null,
    setUser: () => { },
    permittedRoutes: [],
});

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AggregatedUserT | null>(null);
    const [permittedRoutes, setPermittedRoutes] = useState<RouteT[]>([]);

    async function fetchAggregatedUserInfo(username: string): Promise<AggregatedUserT> {
        let role = sessionStorage.getItem("role");
        if (role !== "admin" && role !== "member") {
            sessionStorage.setItem("role", "member");
            role = "member";
        }
    
        let fallbackUser: AggregatedUserT = {
            firstName: "Mock",
            lastName: "User",
            name: "Mock User",
            username: "mockuser",
            email: "mockuser@example.com",
            systemrole: role === "admin" ? "admin" : "member",
            accessibleApis: [],
            groupMemberships: [],
        };
    
        try {
            const user = await getAggregatedUser(username);
            if (user) {
                console.log("Using fetched user", user);
                return user;
            }
        } catch (err) {
            console.error("Error fetching aggregated user:", err);
        }
    
        return fallbackUser; // nur falls API fehlschlägt
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
                    keycloak.loadUserInfo().then((userInfo: { preferred_username?: string;[key: string]: any }) => {
                        console.log("Got username from keycloak");
                        const username = userInfo.preferred_username || "unknown";
                        fetchAggregatedUserInfo(username)
                            .then(fetchedUser => {
                                setUser(fetchedUser);
                                setPermittedRoutes(routes.filter((r) => r.adminOnly ? fetchedUser.systemrole === "admin" : true))
                                console.log("Fetched User details from backend");
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

    if (!user) { return (<></>) }

    return (
        <SessionContext.Provider value={{ user, keycloak, setUser, permittedRoutes }}>
            {children}
        </SessionContext.Provider>
    );
}


