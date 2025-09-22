import { AggregatedGroupT } from "@/types/Types";
import { useForm } from "@mantine/form";



export function useAggregatedGroupForm(existingGroup: AggregatedGroupT | null) {

    const form = useForm<AggregatedGroupT>({
        initialValues: existingGroup ? {
            name: existingGroup.name,
            description: existingGroup.description,
            type: existingGroup.type,
            accessibleApis: existingGroup.accessibleApis,
            groupMembers: existingGroup.groupMembers
        } : {
            name: '',
            description: '',
            type: 'private',
            accessibleApis: [],
            groupMembers: []
        },

        validate: {
            name: (v) => (!v ? 'Required' : null),
            description: (v) => (!v ? 'Required' : null),
            type: (v) => (!v ? 'Required' : null),
            groupMembers: (members) =>
                members.every((m) => m.user && m.roleInGroup)
                    ? null
                    : 'Each group member must have both user and role filled',
        },
    })

    return form;
}