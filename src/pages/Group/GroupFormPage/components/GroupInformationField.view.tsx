import { MyLoader } from "@/components/MyLoader/MyLoader.view";
import { AggregatedGroupT, GROUP_TYPES, GroupTypesT } from "@/types/Types";
import { Fieldset, Group, Select, Skeleton, Space, Textarea, TextInput } from "@mantine/core";
import { useContext } from "react";
import { groupFormContext } from "../GroupFormPage";

export function GroupInformationField({ group }: { group: AggregatedGroupT | null }) {

    const { form, mode } = useContext(groupFormContext)

    if (!form) {
        return <MyLoader />
    }

    if (!group && mode === "edit" ) {
        return (
            <>
                <Space h={8} />
                <Skeleton height={18} width={"14%"}/>
                <Space h={2} />
                <Skeleton height={36}/>

                <Space h={8} />

                <Skeleton height={18} mt={"xs"} width={"14%"}/>
                <Space h={2} />
                <Skeleton height={74}/>

                <Space h={12} />

                <Skeleton height={18} mt={"xs"} width={"14%"}/>
                <Space h={2} />
                <Skeleton height={36}/>
            </>
        )
    }
    
    return (
        <>
            <TextInput
                label="Name"
                placeholder="Name"
                {...form.getInputProps('name')}
                disabled={mode === "edit"}
            />

            <Textarea
                label="Description"
                
                {...form.getInputProps('description')}
                autosize
                minRows={3}
                maxRows={6}
                mt={"md"}
                styles={{
                    input: {
                        paddingTop: 6,
                    }
                }}
            />

            <Select
                label="Type"
                placeholder="Pick a type"
                data={GROUP_TYPES}
                mt={"md"}
                {...form.getInputProps('type' as keyof AggregatedGroupT)}
            />
        </>
    )
}