import { GROUP_TYPES, GroupTypesT } from "@/types/Types";
import { Fieldset, Select, TextInput } from "@mantine/core";


export function GroupInformationField(
    {
        group,
        selectedGroupType,
        setSelectedGroupType,
    }: {
        group: { name: string },
        selectedGroupType: string,
        setSelectedGroupType: (value: GroupTypesT) => void,
    }
) {
    return (
        <Fieldset legend="Group Information">
            <TextInput label="Name" placeholder="Name" value={group.name} />

            <Select
                label="Type"
                placeholder="Pick a type"
                data={GROUP_TYPES}
                mt={"md"}
                value={selectedGroupType}
                onChange={(value) => setSelectedGroupType(value as GroupTypesT)}
            />
        </Fieldset>
    )
}