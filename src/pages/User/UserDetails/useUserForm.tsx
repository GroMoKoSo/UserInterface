import { AggregatedUserT, ApiSpecT, GroupMemberT, GroupMemershipT, GroupRolesT, SimpleGroupT } from '@/types/Types';
import { useForm } from '@mantine/form';
import { group } from 'console';

type GroupOption = { value: string; label: string; group: SimpleGroupT };
type ApiOption   = { value: number; label: string; spec: ApiSpecT };


// existingUser kommt z.B. aus deiner API (AggregatedUserT) oder ist undefined für "create"
export function useAggregatedUserForm(existingUser: AggregatedUserT | null, allGroups: SimpleGroupT[] = [], allApis: ApiSpecT[] = []) {

    const groupOptions: GroupOption[] = allGroups.map(g => ({
      value: g.name, label: g.name, group: g,
    }));
    const apiOptions: ApiOption[] = allApis.map(a => ({
      value: a.id, label: `${a.name} v${a.version}`, spec: a,
    }));

    const form = useForm<AggregatedUserT>({
        mode: 'uncontrolled',
        initialValues: existingUser ? {
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
        } : {
            username: '',
            firstName: '',
            lastName: '',
            name: '',
            email: '',
            systemrole: 'system-member',
            groupMemberships: [],
            accessibleApis: []
        },
        validate: {
            username: (v) => {
                if (!v) return 'Required';
                if (v.length < 3) return 'Too short';
                if (v.toLowerCase() === 'admin') return 'Username cannot be admin';
                if (v.toLowerCase() === 'new') return 'Username cannot be new';

                return null
            },
            firstName: (v) => (!v ? 'Required' : null),
            lastName: (v) => (!v ? 'Required' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            systemrole: (v) => (!v ? 'Required' : null),
            groupMemberships: (memberships) =>
                memberships.every((m) => m.group && m.roleInGroup)
                    ? null
                    : 'Each group membership must have both group and role filled',
        },
    });

    return { form, groupOptions, apiOptions };
}
