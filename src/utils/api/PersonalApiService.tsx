import { AggregatedUserT, ApiSpecT } from '@/types/Types';
import { addApiToUser, getAggregatedUser } from './UserApiService';
import { createApi } from './ApiApiService';
import {
    notificationLoading,
    notificationSuccess,
    notificationError,
} from '../NotificationService';

export function getPersonalDetails(): Promise<AggregatedUserT | null> {
    const id = notificationLoading(
        'Fetching Personal Details ...',
        'Trying to fetch current user details ...'
    );

    return new Promise((resolve) => {
        setTimeout(async () => {
            try {
                // TODO: replace hardcoded user with auth context
                const data = await getAggregatedUser('bob.schneider');

                if (data) {
                    notificationSuccess(id, 'Success!', 'Personal details fetched!');
                } else {
                    notificationError(id, 'Not found', 'Could not find current user.');
                }

                resolve(data);
            } catch {
                notificationError(
                    id,
                    'Error',
                    'An error occurred while fetching personal details.'
                );
                resolve(null);
            }
        }, 2000);
    });
}

export function createPersonalApi(apiSpec: ApiSpecT): Promise<boolean> {
    const id = notificationLoading(
        'Creating Personal API ...',
        `Trying to create personal API "${apiSpec.name}" ...`
    );

    return new Promise((resolve) => {
        setTimeout(async () => {
            try {
                console.log('Adding personal api: ', apiSpec.name);

                // create API (mocked sync id)
                const api_id = createApi(apiSpec);

                if (api_id > 0) {
                    // attach to current user (async)
                    // TODO: replace hardcoded user with auth context
                    const added = await addApiToUser('bob.schneider', api_id);

                    if (added) {
                        notificationSuccess(
                            id,
                            'Success!',
                            `API "${apiSpec.name}" created and assigned to your profile!`
                        );
                        return resolve(true);
                    }

                    notificationError(
                        id,
                        'Error',
                        'API was created, but assigning it to your profile failed.'
                    );
                    return resolve(false);
                }

                notificationError(
                    id,
                    'Error',
                    'Creating the API failed. No API ID returned.'
                );
                resolve(false);
            } catch {
                notificationError(
                    id,
                    'Error',
                    'An error occurred while creating and assigning the personal API.'
                );
                resolve(false);
            }
        }, 2000);
    });
}
