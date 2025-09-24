import { AggregatedUserT } from "@/types/Types.js";
import { Fieldset } from "@mantine/core";
import UserGroupsField from "./components/UserGroupsField.view.js";
import { UserInformationField } from "./components/UserInformationField.view.js";

export default function UserFields({ user }: { user: AggregatedUserT | null }) {

    return (
        <div style={{minWidth: 600}}>
            <Fieldset
                legend="Personal Information"
                mt={"md"}
                w={"100%"}
                maw={1000}
            >
                <UserInformationField user={user} />
            </Fieldset>


            <Fieldset
                legend="Groups"
                mt={"md"}
                w={"100%"}
                maw={1000}
            >
                <UserGroupsField user={user} />
            </Fieldset>
        </div>
    );
}