import { AggregatedGroupT } from "@/types/Types.js";
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
            name: (v: any) => (!v ? 'Required' : null),
            description: (v: any) => (!v ? 'Required' : null),
            type: (v: any) => (!v ? 'Required' : null),
            groupMembers: (members: any) =>
                members.every((m: any) => m.user && m.roleInGroup)
                    ? null
                    : 'Each group member must have both user and role filled',
        },
    })

    return form;
}