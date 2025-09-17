import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";


export function useAddModal() {
    const [opened, { open, close }] = useDisclosure(false);

    const element = (
        <Modal
            opened={opened}
            onClose={close}
            title="Add a User to the Group"
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <Button>Add User</Button>
        </Modal>
    );

    return { opened, open, close, element };
}