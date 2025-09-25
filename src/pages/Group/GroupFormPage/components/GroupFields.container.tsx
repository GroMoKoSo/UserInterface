import { AggregatedGroupT } from "@/types/Types.js";
import { Fieldset } from "@mantine/core";
import { GroupMembersField } from "./GroupMembersField.view.js";
import { GroupInformationField } from "./GroupInformationField.view.js";
import { GroupApisField } from "./GroupApisField.container.js";


export function GroupFieldsLeft({ group }: { group: AggregatedGroupT | null }) {
    return (
        <div style={{minWidth: 600}}>
            <Fieldset legend="Group Information">
                <GroupInformationField group={group} />
            </Fieldset>

            <Fieldset legend="Group Members" mt="md" w="100%" maw={1000}>
                <GroupMembersField group={group} />
            </Fieldset>
        </div>
    );
}


export function GroupFieldsRight({ group }: { group: AggregatedGroupT | null }) {
    return (
        <Fieldset legend="Api's">
            <GroupApisField group={group}/>
        </Fieldset>
    )
}