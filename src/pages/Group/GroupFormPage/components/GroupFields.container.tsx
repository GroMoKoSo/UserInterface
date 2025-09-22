import { AggregatedGroupT, AggregatedUserT, GROUP_TYPES, GroupTypesT, SimpleGroupT, SimpleUserT } from "@/types/Types";
import { getAllUsers } from "@/utils/api/UserApiService";
import { Accordion, Button, Fieldset, Group, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import accordionClasses from "../../../User/UserDetails/components/UserGroups.module.css"
import { MyTable } from "@/components/MyTable/MyTable";
import { useDisclosure } from "@mantine/hooks";
import { IconLink } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom";
import { getAggregatedGroup } from "@/utils/api/GroupApiService";
import { useAddModal } from "../hooks/UseAddModal";
import { useEditModal } from "../hooks/UseEditModal";
import { GroupMembersField } from "./GroupMembersField.view";
import { GroupInformationField } from "./GroupInformationField.view";
import { MyLoader } from "@/components/MyLoader/MyLoader.view";


export default function GroupFields({ group }: { group: AggregatedGroupT | null }) {
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
