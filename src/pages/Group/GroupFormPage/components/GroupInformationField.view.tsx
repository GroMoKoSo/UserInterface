import { MyLoader } from "@/components/MyLoader/MyLoader.view";
import { AggregatedGroupT, GROUP_TYPES, GroupTypesT } from "@/types/Types";
import { Fieldset, Group, Select, Skeleton, Space, Textarea, TextInput } from "@mantine/core";
import { useContext } from "react";
import { groupFormContext } from "../GroupFormPage";
import { GroupInformationSkeleton } from "@/components/Skelletons/Skeletons.view";

export function GroupInformationField({ group }: { group: AggregatedGroupT | null }) {

    const { form, mode } = useContext(groupFormContext)

    if (!form) {
        return <MyLoader />
    }

    if (!group && mode === "edit" ) {
        return (<GroupInformationSkeleton />)
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