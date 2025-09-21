import { ApiSpecT } from "@/types/Types";
import { apiMockData } from "../mockData/apiMock";
import { notificationLoading, notificationSuccess, notificationError } from "../NotificationService";

export function getAllApis(): ApiSpecT[] {
    console.log('Fetching all apis');
    return apiMockData;
}

export function getApi(id: number) {
    console.log('Fetching api: ', id);
    return apiMockData.find(api => api.id === id) || null;
}

export function createApi(api: ApiSpecT): number {
    const id = notificationLoading("Creating API ...", `Trying to create API "${api.name}" ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `API "${api.name}" has been created!`);
        } else {
            notificationError(id, "Error", "An error occurred while trying to create the API.");
        }
    }, 2000);

    console.log('Creating api: ', api);
    return 555; 
}

export function updateApi(id: number, api: ApiSpecT): boolean {
    const idNotification = notificationLoading("Updating API ...", `Trying to update API with ID ${id} ...`);

    setTimeout(() => {
        const index = apiMockData.findIndex(existingApi => existingApi.id === id);
        if (index !== -1) {
            apiMockData[index] = { ...apiMockData[index], ...api };
            notificationSuccess(idNotification, "Success!", `API with ID ${id} has been updated!`);
        } else {
            notificationError(idNotification, "Error", "An error occurred while trying to update the API.");
        }
    }, 2000);

    console.log('Updating api: ', id, api);
    return true;
}

export function deleteApi(id: number): boolean {
    const idNotification = notificationLoading("Deleting API ...", `Trying to delete API with ID ${id} ...`);

    setTimeout(() => {
        const index = apiMockData.findIndex(api => api.id === id);
        if (index !== -1) {
            apiMockData.splice(index, 1);
            notificationSuccess(idNotification, "Success!", `API with ID ${id} has been deleted!`);
        } else {
            notificationError(idNotification, "Error", "An error occurred while trying to delete the API.");
        }
    }, 2000);

    console.log('Deleting api: ', id);
    return true;
}