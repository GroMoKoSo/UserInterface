import { group } from "console";
import { AggregatedGroupT, ApiAccessT, GroupMemberT, GroupMemershipT, SimpleGroupT } from "../../types/Types"
import { groupMockData } from "./../mockData/groupMock"
import { userMockData } from "../mockData/userMock";
import { getAllUsers } from "./UserApiService";
import { getAllApis } from "./ApiApiService";
import { notificationError, notificationSuccess, notificationLoading } from "../NotificationService";
import { get } from "http";

export function getAllGroups(): SimpleGroupT[] {
    console.log("Fetching all groups");
    return groupMockData;
}

export function getGroup(name: string): SimpleGroupT | null {
    console.log("Fetching group: ", name);
    return groupMockData.filter((group: SimpleGroupT) => group.name === name)[0] || null;
}

// private function to aggregate group data#

function getGroupMembers(name: string): GroupMemberT {
    return getAllUsers()
                .sort(() => 0.5 - Math.random()) // Shuffle users
                .slice(0, Math.floor(Math.random() * (12 - 4 + 1)) + 4) // Get 4-12 random members
                .map(user => ({
                    roleInGroup: ["group-admin", "group-editor", "group-member"][Math.floor(Math.random() * 3)] as "group-admin" | "group-editor" | "group-member", // Assign random role
                    user
                }))
}

function getGroupApis(name: string): ApiAccessT[] {
    return getAllApis()
                .sort(() => 0.5 - Math.random()) // Shuffle APIs
                .slice(0, Math.floor(Math.random() * (10 - 2 + 1)) + 2) // Get 2-10 random APIs
                .map(api => ({
                    api: api.id,
                    accessVia: "group",
                    activated: Math.random() < 0.8 // 80% chance of being activated
                }))
}

export function getAggregatedGroup(name: string): AggregatedGroupT | null {
    const group = getGroup(name);
    let aggregatedGroup = null;

    if (!group) return null;

    try {
        aggregatedGroup = {
            ...group,
            groupMembers: getGroupMembers(name),
            accessibleApis: getGroupApis(name)
        };
    } catch (error) {
        return null;
    }

    return aggregatedGroup
}

export function createGroup(group: SimpleGroupT): number {
    const id = notificationLoading("Creating Group ...", `Trying to create group "${group.name}" ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `Group "${group.name}" has been created!`);
        } else {
            notificationError(id, "Error", "An error occurred while trying to create the group.");
        }
    }, 2000);

    console.log("Creating group: ", group);
    return 555;
}

export function updateGroup(name: string, group: SimpleGroupT): boolean {
    const id = notificationLoading("Updating Group ...", `Trying to update group "${name}" ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `Group "${name}" has been updated!`);
        } else {
            notificationError(id, "Error", "An error occurred while trying to update the group.");
        }
    }, 2000);

    console.log("Updating group: ", name, group);
    return true;
}

export function deleteGroup(name: string): boolean {
    const id = notificationLoading("Deleting Group ...", `Trying to delete group "${name}" ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `Group "${name}" has been deleted!`);
        } else {
            notificationError(id, "Error", "An error occurred while trying to delete the group.");
        }
    }, 2000);

    console.log("Deleting group: ", name);
    return true;
}

// User management within groups

// function getUsersInGroup is implemented in getAggregatedGroup

export function addUserToGroup(user_name: string, group_name: string): boolean {
    const id = notificationLoading("Adding User to Group ...", `Trying to add user "${user_name}" to group "${group_name}" ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `User "${user_name}" has been added to group "${group_name}"!`);
        } else {
            notificationError(id, "Error", "An error occurred while trying to add the user to the group.");
        }
    }, 2000);

    console.log("Adding user to group: ", user_name, group_name);
    return true;
}

export function removeUserFromGroup(user_name: string, group_name: string): boolean {
    const id = notificationLoading("Removing User from Group ...", `Trying to remove user "${user_name}" from group "${group_name}" ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `User "${user_name}" has been removed from group "${group_name}"!`);
        } else {
            notificationError(id, "Error", "An error occurred while trying to remove the user from the group.");
        }
    }, 2000);

    console.log("Removing user from group: ", user_name, group_name);
    return true;
}

// API management within groups

// function getApisInGroup is implemented in getAggregatedGroup

export function addApiToGroup(api_id: number, group_name: string): boolean {
    const id = notificationLoading("Adding API to Group ...", `Trying to add API with ID ${api_id} to group "${group_name}" ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `API with ID ${api_id} has been added to group "${group_name}"!`);
        } else {
            notificationError(id, "Error", "An error occurred while trying to add the API to the group.");
        }
    }, 2000);

    console.log("Adding API to group: ", api_id, group_name);
    return true;
}

export function removeApiFromGroup(api_id: number, group_name: string): boolean {
    const id = notificationLoading("Removing API from Group ...", `Trying to remove API with ID ${api_id} from group "${group_name}" ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `API with ID ${api_id} has been removed from group "${group_name}"!`);
        } else {
            notificationError(id, "Error", "An error occurred while trying to remove the API from the group.");
        }
    }, 2000);

    console.log("Removing API from group: ", api_id, group_name);
    return true;
}

export function editApiFromGroup(api_id: number, group_name: string, new_api_data: any): boolean {
    const id = notificationLoading("Editing API in Group ...", `Trying to edit API with ID ${api_id} in group "${group_name}" ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `API with ID ${api_id} in group "${group_name}" has been updated!`);
        } else {
            notificationError(id, "Error", "An error occurred while trying to edit the API in the group.");
        }
    }, 2000);

    console.log("Editing API from group: ", api_id, group_name, new_api_data);
    return true;
}