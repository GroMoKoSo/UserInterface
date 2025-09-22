import { Space, Skeleton, Group } from "@mantine/core";



export function GroupInformationSkeleton() {
    return (
        <>
            <Space h={8} />
            <Skeleton height={18} width={"14%"} />
            <Space h={2} />
            <Skeleton height={36} />

            <Space h={8} />

            <Skeleton height={18} mt={"xs"} width={"14%"} />
            <Space h={2} />
            <Skeleton height={74} />

            <Space h={12} />

            <Skeleton height={18} mt={"xs"} width={"14%"} />
            <Space h={2} />
            <Skeleton height={36} />
        </>
    )
}

export function GroupMembersSkeleton() {
    return (

        <>
            <Skeleton height={36} />
            
            <Space h={28} />

            <TableSkeleton />

            <Skeleton height={34} mt={"lg"} />
        </>

    )
}

export function TableSkeleton() {
    return (

        <>
            <Group>
                <Skeleton height={22} width={"30%"} />
                <Skeleton height={22} width={"30%"} />
            </Group>

            <Skeleton height={53} mt={"sm"} />
            <Skeleton height={53} mt={"xs"} />
            <Skeleton height={53} mt={"xs"} />
        </>

    )
}

export function UserInformationSkeleton() {
    return (
        <>
            <Space h={24} />
            <Skeleton height={36} />
            <Space h={24} />
            <Group mt={"md"} justify="space-between">
                <Skeleton height={36} w={"48%"} />
                <Skeleton height={36} w={"48%"} />
            </Group>
            <Space h={24} />
            <Group mt={"md"} justify="space-between">
                <Skeleton height={36} w={"48%"} />
                <Skeleton height={36} w={"48%"} />
            </Group>
        </>
    )
}