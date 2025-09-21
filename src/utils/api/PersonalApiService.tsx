import { AggregatedUserT, ApiSpecT } from "@/types/Types";
import { addApiToUser, getAggregatedUser } from "./UserApiService";
import { createApi } from "./ApiApiService";


export function getPersonalDetails(): AggregatedUserT | null {
    return getAggregatedUser("bob.schneider");    // TODO add auth context to get current user
}

export function createPersonalApi(apiSpec: ApiSpecT): boolean {
    console.log("Adding personal api: ", apiSpec.name);

    const api_id = createApi(apiSpec);

    if (api_id > 0) { 
        return addApiToUser("bob.schneider", api_id);   // TODO add auth context to get current user
    }

    return false;
}