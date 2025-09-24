import { Group, Title } from "@mantine/core";
import BackButton from "../backButtons/BackButton.view.js";
import { MyLoader } from "../MyLoader/MyLoader.view.js";



export default function Header({title, backButton=false}: {title: string, backButton?: boolean}) {
    if (!title) {
        return (<MyLoader />)
    }
    
    return (
        <Group justify="space-between" w={"100%"}>
            <Title order={1} >{title}</Title>
            {backButton? <BackButton/>:<></>}
        </Group>
    )
}