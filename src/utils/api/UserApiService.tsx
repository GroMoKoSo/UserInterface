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

export function getUser(userId: number): SimpleUserT | null {
    console.log('Fetching user: ', userId);
    return userMockData.filter((user: SimpleUserT) => user.id === userId)[0] || null;
}

export function getAggregatedUser(userId: number): AggregatedUserT | null {
    const user = getUser(userId);
    let aggregatedUser: AggregatedUserT ;

    if (!user) return null;

    try {
        aggregatedUser = {
            ...user,
            groupMemberships: groupMockData
                            .sort(() => 0.5 - Math.random()) // Shuffle groups
                            .slice(0, Math.floor(Math.random() * (3 - 1 + 1)) + 4) // Get 1-3 random members
                            .map((group: SimpleGroupT) => ({
                                roleInGroup: ["Group-Admin", "Group-Editor", "Group-Member"][Math.floor(Math.random() * 3)] as "Group-Admin" | "Group-Editor" | "Group-Member", // Assign random role
                                group
                            })),
            accessibleApis: getAllApis()
        }
    } catch (error) {
        return null;
    }

    return aggregatedUser;
}

export function createUser(user: SimpleUserT): boolean {
    const id = notificationLoading("Deleting User ...", `Trying to create User ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `User has been created!`)
        } else {
            notificationError(id, "Error", "An error occoured while tryin to delete a user")
        }
    }, 2000);

    console.log('Creating user: ', user);
    return true
}

export function updateUser(userId: number, user: SimpleUserT): boolean {
    const id = notificationLoading("Updating User ...", `Trying to update User with ID ${userId} ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `User with ID ${userId} has been updated!`)
        } else {
            notificationError(id, "Error", "An error occoured while tryin to update a user")
        }
    }, 2000);

    console.log('Updating user: ', userId, user);
    return true
}

export function deleteUser(userId: number): boolean {
    const id = notificationLoading("Deleting User ...", `Trying to delete User with ID ${userId} ...`);

    setTimeout(() => {
        if (true) {
            notificationSuccess(id, "Success!", `User with ID ${userId} has been deleted!`)
        } else {
            notificationError(id, "Error", "An error occoured while tryin to delete a user")
        }
    }, 2000);

    console.log('Deleting user: ', userId);
    return true
}