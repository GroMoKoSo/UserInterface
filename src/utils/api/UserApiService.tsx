import { notifications } from '@mantine/notifications';
import { AggregatedUserT, SimpleGroupT, SimpleUserT } from '../../types/Types';
import {userMockData} from "../mockData/userMock"
import { useEffect } from 'react';
import { notificationError, notificationLoading, notificationSuccess } from '../NotificationService';
import { getAllApis } from './ApiApiService';
import { groupMockData } from '../mockData/groupMock';


export function getAllUsers(): SimpleUserT[] {
    console.log('Fetching all users');
    return userMockData
}

export function getUser(username: string): SimpleUserT | null {
    console.log('Fetching user: ', username);
    return userMockData.filter((user: SimpleUserT) => user.username === username)[0] || null;
}

export function getAggregatedUser(username: string): AggregatedUserT | null {
    const user = getUser(username);
    let aggregatedUser: AggregatedUserT ;

    if (!user) return null;

    try {
        aggregatedUser = {
            ...user,
            groupMemberships: groupMockData
                            .sort(() => 0.5 - Math.random()) // Shuffle groups
                            .slice(0, Math.floor(Math.random() * (3 - 1 + 1)) + 4) // Get 1-3 random members
                            .map((group: SimpleGroupT) => ({
                                roleInGroup: ["group-admin", "group-editor", "group-member"][Math.floor(Math.random() * 3)] as "group-admin" | "group-editor" | "group-member", // Assign random role
                                group
                            })),
            accessibleApis: getAllApis()
        }
    } catch (error) {
        return null;
    }

    return aggregatedUser;
}

export function createUser(user: SimpleUserT): number {
    const id = notificationLoading("Deleting User ...", `Trying to create User ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `User has been created!`)
        } else {
            notificationError(id, "Error", "An error occoured while tryin to delete a user")
        }
    }, 2000);

    console.log('Creating user: ', user);
    return 555
}

export function updateUser(username: string, user: SimpleUserT): boolean {
    const id = notificationLoading("Updating User ...", `Trying to update User ${username} ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `User ${username} has been updated!`)
        } else {
            notificationError(id, "Error", "An error occoured while tryin to update a user")
        }
    }, 2000);

    console.log('Updating user: ', username, user);
    return true
}

export function deleteUser(username: string): boolean {
    const id = notificationLoading("Deleting User ...", `Trying to delete User ${username} ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `User ${username} has been deleted!`)
        } else {
            notificationError(id, "Error", "An error occoured while tryin to delete a user")
        }
    }, 2000);

    console.log('Deleting user: ', username);
    return true
}

// Group management within user

//  functiion getGroupsForUser is implemented in getAggregatedUser


// API management within user 

// functiion getApisForUser is implemented in getAggregatedUser

export function addApiToUser(username: string, apiId: number): boolean {
    const id = notificationLoading("Adding API to User ...", `Trying to add API with ID ${apiId} to User ${username} ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `API with ID ${apiId} has been added to User ${username} !`)
        } else {
            notificationError(id, "Error", "An error occoured while tryin to add API to user")
        }
    }, 2000);

    console.log('Adding API to user: ', username, apiId);
    return true
}

export function removeApiFromUser(username: string, apiId: number): boolean {
    const id = notificationLoading("Removing API from User ...", `Trying to remove API with ID ${apiId} from User ${username} ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `API with ID ${apiId} has been removed from User ${username} !`)
        } else {
            notificationError(id, "Error", "An error occoured while tryin to remove API from user")
        }
    }, 2000);

    console.log('Removing API from user: ', username, apiId);
    return true
}