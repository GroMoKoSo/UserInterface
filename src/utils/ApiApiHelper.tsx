import { ApiSpecT } from "@/types/Types";

export function getAllApis() {
    console.log('Fetching all apis');
    return {};
}

export function getApi(id: string) {
    console.log('Fetching api: ', id);
    return {};
}

export function createApi(api: ApiSpecT) {
    console.log('Creating api: ', api);
    return {};
}

export function updateApi(id: string, api: ApiSpecT) {
    console.log('Updating api: ', id, api);
    return {};
}

export function deleteApi(id: string) {
    console.log('Deleting api: ', id);
    return {};
}