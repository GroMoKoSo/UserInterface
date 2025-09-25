import { MyLoader } from "@/components/MyLoader/MyLoader.view.js";
import { AggregatedGroupT, GROUP_TYPES } from "@/types/Types.js";
import { Select, Textarea, TextInput } from "@mantine/core";
import { useContext } from "react";
import { groupFormContext } from "../GroupFormPage.js";
import { GroupInformationSkeleton } from "@/components/Skelletons/Skeletons.view.js";

export function GroupInformationField({ group, systemRole, groupRole }: { group: AggregatedGroupT | null, systemRole: string, groupRole: string }) {

    const { form, mode } = useContext(groupFormContext)

    const fieldDisabled = () => {
        if (mode === "edit") {
            if (systemRole === "admin") {
                return false
            }

            if (groupRole === "admin") {
                return false
            }
            
            return true
        }
        return false
    }

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
                disabled={fieldDisabled()}
            />

            <Select
                label="Type"
                placeholder="Pick a type"
                data={GROUP_TYPES}
                mt={"md"}
                {...form.getInputProps('type' as keyof AggregatedGroupT)}
                disabled={fieldDisabled()}
            />
        </>
    )
}