import { AggregatedUserT, SimpleGroupT, SimpleUserT } from '../../types/Types';
import { userMockData } from '../mockData/userMock';
import { notificationError, notificationLoading, notificationSuccess } from '../NotificationService';
import { getAllApis } from './ApiApiService';
import { groupMockData } from '../mockData/groupMock';

// Users

export function getAllUsers(): Promise<SimpleUserT[]> {
  //const id = notificationLoading('Fetching Users ...', 'Trying to fetch all users ...');

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      //notificationSuccess(id, 'Success!', 'Users have been fetched!');
      console.log('Fetching all users');
      resolve(userMockData);
    }, 500);
  });
}

export function getUser(username: string): Promise<SimpleUserT | null> {
  //const id = notificationLoading('Fetching User ...', `Trying to fetch User ${username} ...`);

  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const user = userMockData.find((u: SimpleUserT) => u.username === username) || null;
        //notificationSuccess(id, 'Success!', `User ${username} has been fetched!`);
        console.log('Fetching user: ', username);
        resolve(user);
      } catch (e) {
        //notificationError(id, 'Error', `An error occurred while trying to fetch user ${username}`);
        resolve(null);
      }
    }, 500);
  });
}

export async function getAggregatedUser(username: string): Promise<AggregatedUserT | null> {
  //const id = notificationLoading('Fetching Aggregated User ...', `Trying to fetch aggregated data for ${username} ...`);

  return new Promise(async (resolve) => {
    setTimeout(async () => {
      try {
        const user = await getUser(username);
        if (!user) {
          //notificationError(id, 'Not found', `User ${username} does not exist`);
          return resolve(null);
        }

        const aggregatedUser: AggregatedUserT = {
          ...user,
          groupMemberships: groupMockData
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * (3 - 1 + 1)) + 4)
            .map((group: SimpleGroupT) => ({
              roleInGroup: (['group-admin', 'group-editor', 'group-member'][
                Math.floor(Math.random() * 3)
              ] || 'group-member') as 'group-admin' | 'group-editor' | 'group-member',
              group,
            })),
          accessibleApis: getAllApis(),
        };

        //notificationSuccess(id, 'Success!', `Aggregated data for ${username} has been fetched!`);
        console.log('Fetching aggregated user: ', username);
        resolve(aggregatedUser);
      } catch (error) {
        //notificationError(id, 'Error', `An error occurred while trying to fetch aggregated user ${username}`);
        resolve(null);
      }
    }, 500);
  });
}

export function createUser(user: SimpleUserT): Promise<number> {
  const id = notificationLoading('Creating User ...', 'Trying to create User ...');

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      notificationSuccess(id, 'Success!', 'User has been created!');
      console.log('Creating user: ', user);
      resolve(555);
    }, 2000);
  });
}

export function updateUser(username: string, user: SimpleUserT): Promise<boolean> {
  const id = notificationLoading('Updating User ...', `Trying to update User ${username} ...`);

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      notificationSuccess(id, 'Success!', `User ${username} has been updated!`);
      console.log('Updating user: ', username, user);
      resolve(true);
    }, 2000);
  });
}

export function deleteUser(username: string): Promise<boolean> {
  const id = notificationLoading('Deleting User ...', `Trying to delete User ${username} ...`);

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      notificationSuccess(id, 'Success!', `User ${username} has been deleted!`);
      console.log('Deleting user: ', username);
      resolve(true);
    }, 2000);
  });
}

// API management within user

export function addApiToUser(username: string, apiId: number): Promise<boolean> {
  const id = notificationLoading(
    'Adding API to User ...',
    `Trying to add API with ID ${apiId} to User ${username} ...`
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      notificationSuccess(id, 'Success!', `API with ID ${apiId} has been added to User ${username}!`);
      console.log('Adding API to user: ', username, apiId);
      resolve(true);
    }, 2000);
  });
}

export function removeApiFromUser(username: string, apiId: number): Promise<boolean> {
  const id = notificationLoading(
    'Removing API from User ...',
    `Trying to remove API with ID ${apiId} from User ${username} ...`
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      notificationSuccess(id, 'Success!', `API with ID ${apiId} has been removed from User ${username}!`);
      console.log('Removing API from user: ', username, apiId);
      resolve(true);
    }, 2000);
  });
}
