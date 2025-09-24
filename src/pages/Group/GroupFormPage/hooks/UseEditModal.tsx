import { Modal, Stack, Button, Select } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { AggregatedGroupT, GROUP_ROLES } from "@/types/Types.js";
import { UseFormReturnType } from "@mantine/form";

export function useEditModal(memberIndex: number | null, form: UseFormReturnType<AggregatedGroupT, (values: AggregatedGroupT) => AggregatedGroupT>) {
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