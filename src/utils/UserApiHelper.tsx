import { notifications } from '@mantine/notifications';
import { UserT } from '../types/Types';
import {userMockData} from "./mockData/userMock"
import { useEffect } from 'react';
import { notificationError, notificationLoading, notificationSuccess } from './ApiHelper';


export function getAllUsers(): UserT[] {
    console.log('Fetching all users');
    return userMockData
}

export function getUser(userId: number): UserT | null {
    console.log('Fetching user: ', userId);
    return userMockData.filter((user: UserT) => user.id === userId)[0] || null;
}

export function createUser(user: UserT): boolean {
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

export function updateUser(userId: number, user: UserT): boolean {
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