import { ApiSpecT } from "@/types/Types";
import { apiMockData } from "../mockData/apiMock";

export function getAllApis(): ApiSpecT[]{
    console.log('Fetching all apis');
    return apiMockData;
}

export function getApi(id: number) {
    console.log('Fetching api: ', id);
    return apiMockData.find(api => api.id === id) || null;
}

export function createApi(api: ApiSpecT) {
    console.log('Creating api: ', api);
    apiMockData.push(api);
    return api;
}

export function updateApi(id: number, api: ApiSpecT) {
    console.log('Updating api: ', id, api);
    const index = apiMockData.findIndex(existingApi => existingApi.id === id);
    if (index !== -1) {
        apiMockData[index] = { ...apiMockData[index], ...api };
        return apiMockData[index];
    }
    return null;
}

export function deleteApi(id: number) {
    console.log('Deleting api: ', id);
    const index = apiMockData.findIndex(api => api.id === id);
    if (index !== -1) {
        const deletedApi = apiMockData.splice(index, 1);
        return deletedApi[0];
    }
    return null;
}