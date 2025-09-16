import { GroupT } from "../types/Types"
import {groupMockData} from "./mockData/groupMock"

export function getAllGroups(): GroupT[] {
    console.log("Fetching all groups");
    return groupMockData;
}

export function getGroup(id: number): GroupT | null {
    console.log("Fetching group: ", id);
    return groupMockData.filter((group: GroupT) => group.id === id)[0] || null;
}

export function createGroup(group: GroupT): boolean {
    console.log("Creating group: ", group);
    return true;
}

export function updateGroup(id: number, group: GroupT): boolean {
    console.log("Updating group: ", id, group);
    return true;
}

export function deleteGroup(id: number): boolean {
    console.log("Deleting group: ", id);
    return true;
}

export function addUserToGroup(userId: number, groupId: number): boolean {
    console.log("Adding user to group: ", userId, groupId);
    return true;
}