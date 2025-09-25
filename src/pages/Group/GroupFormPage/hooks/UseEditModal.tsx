import { Modal, Stack, Button, Select } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { AggregatedGroupT, API_ACTIVATION_TYPES, GROUP_ROLES } from "@/types/Types.js";
import { UseFormReturnType } from "@mantine/form";
import { useContext } from "react";
import { groupFormContext } from "../GroupFormPage.js";

export function useEditModalGroupMember(memberIndex: number | null, form: UseFormReturnType<AggregatedGroupT, (values: AggregatedGroupT) => AggregatedGroupT>) {
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate()

    const member = (memberIndex !== null && form) ? form.getValues().groupMembers[memberIndex] : null;
    const group = form ? form.getValues() : null;

    const element = member && group ? (
        <Modal
            opened={opened}
            onClose={close}
            title={<strong>{member.user.name}</strong>}
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <Stack>

                <Select
                    label={`Role in ${group.name}`}
                    placeholder="Pick a role"
                    data={GROUP_ROLES}
                    {...form.getInputProps(`groupMembers.${memberIndex}.roleInGroup`)}
                />

                <Button
                    variant="light"
                    onClick={() => navigate(`/users/${member.user.username}`)}
                >
                    Go to User Details
                </Button>

            </Stack>
        </Modal>
    ) : null;
    return { opened, open, close, element };
}

export function useEditModalApis(
    apiIndex: number | null,
    api: any | null,
) {
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const FormContext = useContext(groupFormContext);
    const form = FormContext.form;

    const element = api && form ? (
        <Modal
            opened={opened}
            onClose={close}
            title={<strong>{api.name}</strong>}
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <Stack>

                <Select
                    label={`Activation Status in ${api.name}`}
                    placeholder="Pick a role"
                    data={API_ACTIVATION_TYPES}
                    {...form.getInputProps(`accessibleApis.${apiIndex}.activationStatus`)} // Just to show something here
                />

                <Button
                    variant="light"
                    onClick={() => navigate(`/apis/${api.id}`)}
                >
                    Go to Api Details
                </Button>
            </Stack>
        </Modal>
    ) : null;

    return { opened, open, close, element };
}