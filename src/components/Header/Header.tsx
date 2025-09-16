import { Group, Title } from "@mantine/core";
import BackButton from "../backButtons/BackButton";



export default function Header({title, backButton=false}: {title: string, backButton?: boolean}) {

    return (
        <Group justify="space-between" w={"100%"}>
            <Title order={1} >{title}</Title>
            {backButton? <BackButton/>:<></>}
        </Group>
    )
}