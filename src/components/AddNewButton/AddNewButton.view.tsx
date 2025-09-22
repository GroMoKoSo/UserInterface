import { Button } from "@mantine/core";


export function AddNewButton({ onClick, label }: { onClick: () => void, label?: string }) {
    return (
        <Button
            mt={"md"}
            w={"100%"}
            variant='outline'
            color={'green'}
            onClick={onClick}
        >
            {label ? label : "Add New"}
        </Button>
    )

}