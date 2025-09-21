import { AggregatedUserT, ApiSpecT, GroupMemberT, GroupMemershipT, GroupRolesT, SimpleGroupT } from '@/types/Types';
import { useForm } from '@mantine/form';
import { group } from 'console';

type GroupOption = { value: string; label: string; group: SimpleGroupT };
type ApiOption   = { value: number; label: string; spec: ApiSpecT };


// existingUser kommt z.B. aus deiner API (AggregatedUserT) oder ist undefined für "create"
export function useAggregatedUserForm(existingUser: AggregatedUserT, allGroups: SimpleGroupT[] = [], allApis: ApiSpecT[] = []) {
    const groupOptions: GroupOption[] = allGroups.map(g => ({
      value: g.name, label: g.name, group: g,
    }));
    const apiOptions: ApiOption[] = allApis.map(a => ({
      value: a.id, label: `${a.name} v${a.version}`, spec: a,
    }));

    const form = useForm<AggregatedUserT>({
        mode: 'uncontrolled',
        initialValues: {
            username: existingUser.username,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            name: existingUser.firstName + " " + existingUser.lastName,
            email: existingUser.email,
            systemrole: existingUser.systemrole,
            groupMemberships: existingUser.groupMemberships.map((gm: { group: SimpleGroupT, roleInGroup: GroupRolesT }) => ({
                group: gm.group,
                roleInGroup: gm.roleInGroup
            })),
            accessibleApis: existingUser.accessibleApis
        },
        validate: {
            'username': (v) => (!v ? 'Required' : null),
            'firstName': (v) => (!v ? 'Required' : null),
            'lastName': (v) => (!v ? 'Required' : null),
            'email': (v) => (!v || !/^\S+@\S+\.\S+$/.test(v) ? 'Invalid email' : null),
            'systemrole': (v) => (!v ? 'Required' : null),
            // optional: weitere Checks
        },
    });

    return { form, groupOptions, apiOptions };
}
