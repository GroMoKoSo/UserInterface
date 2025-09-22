import { AggregatedGroupT, ApiAccessT, GroupMemberT, SimpleGroupT } from '../../types/Types';
import { groupMockData } from './../mockData/groupMock';
import { getAllUsers } from './UserApiService';
import { getAllApis } from './ApiApiService';
import { notificationError, notificationSuccess, notificationLoading } from '../NotificationService';

// Groups

export function getAllGroups(): Promise<SimpleGroupT[]> {
  //const id = notificationLoading('Fetching Groups ...', 'Trying to fetch all groups ...');

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      //notificationSuccess(id, 'Success!', 'Groups have been fetched!');
      console.log('Fetching all groups');
      resolve(groupMockData);
    }, 500);
  });
}

export function getGroup(name: string): Promise<SimpleGroupT | null> {
  //const id = notificationLoading('Fetching Group ...', `Trying to fetch group "${name}" ...`);

  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const grp = groupMockData.find((g: SimpleGroupT) => g.name === name) || null;
        if (grp) {
          //notificationSuccess(id, 'Success!', `Group "${name}" has been fetched!`);
        } else {
          //notificationError(id, 'Not found', `Group "${name}" does not exist`);
        }
        console.log('Fetching group: ', name);
        resolve(grp);
      } catch {
        //notificationError(id, 'Error', `An error occurred while trying to fetch group "${name}"`);
        resolve(null);
      }
    }, 500);
  });
}

// private helpers to aggregate group data

async function getGroupMembers(name: string): Promise<GroupMemberT> {
  // relies on UserApiService.getAllUsers() which returns Promise<SimpleUserT[]>
  const users = await getAllUsers();

  return users
    .sort(() => 0.5 - Math.random()) // Shuffle users
    .slice(0, Math.floor(Math.random() * (12 - 4 + 1)) + 4) // 4–12 random members
    .map((user) => ({
      roleInGroup: (['group-admin', 'group-editor', 'group-member'][Math.floor(Math.random() * 3)] ||
        'group-member') as 'group-admin' | 'group-editor' | 'group-member',
      user,
    }));
}

function getGroupApis(_name: string): ApiAccessT[] {
  return getAllApis()
    .sort(() => 0.5 - Math.random()) // Shuffle APIs
    .slice(0, Math.floor(Math.random() * (10 - 2 + 1)) + 2) // 2–10 random APIs
    .map((api) => ({
      api: api.id,
      accessVia: 'group' as const,
      activated: Math.random() < 0.8, // 80% chance
    }));
}

export function getAggregatedGroup(name: string): Promise<AggregatedGroupT | null> {
  //const id = notificationLoading('Fetching Aggregated Group ...', `Trying to fetch aggregated data for group "${name}" ...`);

  return new Promise(async (resolve) => {
    setTimeout(async () => {
      try {
        const grp = await getGroup(name);
        if (!grp) {
          //notificationError(id, 'Not found', `Group "${name}" does not exist`);
          return resolve(null);
        }

        const aggregated: AggregatedGroupT = {
          ...grp,
          groupMembers: await getGroupMembers(name),
          accessibleApis: getGroupApis(name),
        };

        //notificationSuccess(id,'Success!', `Aggregated data for group "${name}" has been fetched!` );
        console.log('Fetching aggregated group: ', name);
        resolve(aggregated);
      } catch {
        //notificationError(id,'Error',`An error occurred while trying to fetch aggregated group "${name}"`);
        resolve(null);
      }
    }, 500);
  });
}

export function createGroup(group: SimpleGroupT): Promise<number> {
  const id = notificationLoading(
    'Creating Group ...',
    `Trying to create group "${group.name}" ...`
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      notificationSuccess(id, 'Success!', `Group "${group.name}" has been created!`);
      console.log('Creating group: ', group);
      resolve(555);
    }, 2000);
  });
}

export function updateGroup(group: AggregatedGroupT): Promise<boolean> {
  const id = notificationLoading(
    'Updating Group ...',
    `Trying to update group "${group.name}" ...`
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      notificationSuccess(id, 'Success!', `Group "${group.name}" has been updated!`);
      console.log('Updating group: ', group.name, group);
      resolve(true);
    }, 2000);
  });
}

export function deleteGroup(name: string): Promise<boolean> {
  const id = notificationLoading(
    'Deleting Group ...',
    `Trying to delete group "${name}" ...`
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      notificationSuccess(id, 'Success!', `Group "${name}" has been deleted!`);
      console.log('Deleting group: ', name);
      resolve(true);
    }, 2000);
  });
}

// User management within groups

export function addUserToGroup(user_name: string, group_name: string): Promise<boolean> {
  const id = notificationLoading(
    'Adding User to Group ...',
    `Trying to add user "${user_name}" to group "${group_name}" ...`
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      notificationSuccess(
        id,
        'Success!',
        `User "${user_name}" has been added to group "${group_name}"!`
      );
      console.log('Adding user to group: ', user_name, group_name);
      resolve(true);
    }, 2000);
  });
}

export function removeUserFromGroup(user_name: string, group_name: string): Promise<boolean> {
  const id = notificationLoading(
    'Removing User from Group ...',
    `Trying to remove user "${user_name}" from group "${group_name}" ...`
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      notificationSuccess(
        id,
        'Success!',
        `User "${user_name}" has been removed from group "${group_name}"!`
      );
      console.log('Removing user from group: ', user_name, group_name);
      resolve(true);
    }, 2000);
  });
}

// API management within groups

export function addApiToGroup(api_id: number, group_name: string): Promise<boolean> {
  const id = notificationLoading(
    'Adding API to Group ...',
    `Trying to add API with ID ${api_id} to group "${group_name}" ...`
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      notificationSuccess(
        id,
        'Success!',
        `API with ID ${api_id} has been added to group "${group_name}"!`
      );
      console.log('Adding API to group: ', api_id, group_name);
      resolve(true);
    }, 2000);
  });
}

export function removeApiFromGroup(api_id: number, group_name: string): Promise<boolean> {
  const id = notificationLoading(
    'Removing API from Group ...',
    `Trying to remove API with ID ${api_id} from group "${group_name}" ...`
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      notificationSuccess(
        id,
        'Success!',
        `API with ID ${api_id} has been removed from group "${group_name}"!`
      );
      console.log('Removing API from group: ', api_id, group_name);
      resolve(true);
    }, 2000);
  });
}

export function editApiFromGroup(
  api_id: number,
  group_name: string,
  new_api_data: any
): Promise<boolean> {
  const id = notificationLoading(
    'Editing API in Group ...',
    `Trying to edit API with ID ${api_id} in group "${group_name}" ...`
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      // fake success
      notificationSuccess(
        id,
        'Success!',
        `API with ID ${api_id} in group "${group_name}" has been updated!`
      );
      console.log('Editing API from group: ', api_id, group_name, new_api_data);
      resolve(true);
    }, 2000);
  });
}
