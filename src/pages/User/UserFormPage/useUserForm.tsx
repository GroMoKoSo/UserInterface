import { AggregatedUserT, ApiSpecT, SimpleGroupT } from '@/types/Types.js';
import { useForm } from '@mantine/form';

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
            groupMemberships: existingUser.groupMemberships,
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
            username: (v: string) => {
                if (!v) return 'Required';
                if (v.length < 3) return 'Too short';
                if (v.toLowerCase() === 'admin') return 'Username cannot be admin';
                if (v.toLowerCase() === 'new') return 'Username cannot be new';

                return null
            },
            firstName: (v: any) => (!v ? 'Required' : null),
            lastName: (v: any) => (!v ? 'Required' : null),
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            systemrole: (v: any) => (!v ? 'Required' : null),
            groupMemberships: (memberships: any[]) =>
                memberships.every((m) => m.group && m.roleInGroup)
                    ? null
                    : 'Each group membership must have both group and role filled',
        },
    });

    return { form, groupOptions, apiOptions };
}
