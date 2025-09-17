import { Modal, Stack, Button, Select } from "@mantine/core"
import { useNavigate } from "react-router-dom";
import { GroupMemberT } from "../components/GroupFields.container";
import { useDisclosure } from "@mantine/hooks";
import { SimpleGroupT } from "@/types/Types";

export function useEditModal(member: GroupMemberT | null, group?: SimpleGroupT | null) {
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate()

    const element = member && group ? (
        <Modal
            opened={opened}
            onClose={close}
            title={<strong>{member.name}</strong>}
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <Stack>

                <Button
                    variant="light"
                    onClick={() => navigate(`/users/${member.id}`)}
                >
                    Go to User Details
                </Button>             

                <Select
                    label={`Role in ${group.name}`}
                    placeholder="Pick a role"
                    data={["Admin", "User"]}
                    defaultValue={member.groupRole}
                />



                <Button mt="md" color="green" onClick={close}>
                    Save
                </Button>

            </Stack>
        </Modal>
    ) : null;
    return { opened, open, close, element };
}