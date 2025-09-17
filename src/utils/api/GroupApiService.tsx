import { group } from "console";
import { AggregatedGroupT, SimpleGroupT } from "../../types/Types"
import { groupMockData } from "./../mockData/groupMock"
import { userMockData } from "../mockData/userMock";
import { getAllUsers } from "./UserApiService";
import { getAllApis } from "./ApiApiService";

export function getAllGroups(): SimpleGroupT[] {
    console.log("Fetching all groups");
    return groupMockData;
}

export function getGroup(id: number): SimpleGroupT | null {
    console.log("Fetching group: ", id);
    return groupMockData.filter((group: SimpleGroupT) => group.id === id)[0] || null;
}

export function getAggregatedGroup(id: number): AggregatedGroupT | null {
    const group = getGroup(id);
    let aggregatedGroup = null;

    if (!group) return null;

    try {
        aggregatedGroup = {
            ...group,
            size: Math.floor(Math.random() * 100), // Mocking size
            members: getAllUsers()
                .sort(() => 0.5 - Math.random()) // Shuffle users
                .slice(0, Math.floor(Math.random() * (12 - 4 + 1)) + 4) // Get 4-12 random members
                .map(user => ({
                    roleInGroup: ["Group-Admin", "Group-Editor", "Group-Member"][Math.floor(Math.random() * 3)] as "Group-Admin" | "Group-Editor" | "Group-Member", // Assign random role
                    user
                })),
            accessibleApis: getAllApis()
                .sort(() => 0.5 - Math.random()) // Shuffle APIs
                .slice(0, Math.floor(Math.random() * (10 - 2 + 1)) + 2) // Get 2-10 random APIs
        };
    } catch (error) {
        return null;
    }


    return aggregatedGroup
}

export function createGroup(group: SimpleGroupT): boolean {
    console.log("Creating group: ", group);
    return true;
}

export function updateGroup(id: number, group: SimpleGroupT): boolean {
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