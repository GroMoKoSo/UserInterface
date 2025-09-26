import { AggregatedGroupT, GROUP_ROLES, GroupMemberT, SimpleUserT } from "@/types/Types.js";
import { getAllUsers } from "@/utils/api/UserApiService.js";
import { Button, Modal, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import { groupFormContext } from "../GroupFormPage.js";


export function useAddModalGroupMember() {

    const FormContext = useContext(groupFormContext);
    const form = FormContext.form;
    
    const [opened, { open, close }] = useDisclosure(false);

    const [selectedMember, setSelectedMember] = useState<GroupMemberT[number] | null>(null);
    const [possibleUsers, setPossibleUsers] = useState<SimpleUserT[]>([]);
    const [allUsers, setAllUsers] = useState<SimpleUserT[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            await getAllUsers().then(res => {
                setAllUsers(res);
            });
        };
        fetchUsers();
    }, []);

    useEffect(() => {   
        const filtered = allUsers
            .filter(u => form.getValues().groupMembers
                .map((gm: { user: { username: any; }; }) => gm.user.username)
                .includes(u.username) === false
            );

        setPossibleUsers(filtered);
        console.log("possible users", filtered);
    }, [allUsers, form.getValues().groupMembers]);


    const element = (
        <Modal
            opened={opened}
            onClose={close}
            title="Add a User to the Group"
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <Select
                label={`User`}
                placeholder="Pick a user"
                data={possibleUsers.map(u => u.name)}
                value={selectedMember ? selectedMember.user.name : null}
                onChange={(value) => {
                    if (!value) { setSelectedMember(null); return;}

                    const user = possibleUsers.find(u => u.name === value);
                    if (user) {
                        setSelectedMember(prev => ({
                            user: user,
                            roleInGroup: prev?.roleInGroup ?? GROUP_ROLES[0]
                        }));
                    }
                }}
            />

            <Select
                label={`Role in ${form.values.name}`}
                placeholder="Pick a role"
                mt={"md"}
                data={GROUP_ROLES}
                value={selectedMember ? selectedMember.roleInGroup : null}
                onChange={(value) => {
                    if (!value) { setSelectedMember(null); return;}
                    setSelectedMember(prev => {
                        if (!prev) return null;
                        return {
                            ...prev,
                            roleInGroup: value as typeof GROUP_ROLES[number]
                        };
                    });
                }}
            />

            <Button
                mt={"md"}
                w={"100%"}
                variant="light"
                onClick={() => {
                    if (selectedMember) {
                        form.insertListItem("groupMembers", selectedMember);
                        setSelectedMember(null);
                        close();
                    }
                }}
            >
                Add User
            </Button>
        </Modal>
    );

    return { opened, open, close, element };
}


export function useAddModal() {

    const FormContext = useContext(groupFormContext);
    const form = FormContext.form;
    
    const [opened, { open, close }] = useDisclosure(false);

    const [selectedMember, setSelectedMember] = useState<GroupMemberT[number] | null>(null);
    const [possibleUsers, setPossibleUsers] = useState<SimpleUserT[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            await getAllUsers().then(res => {
                const filtered = res.filter(u => form.values.groupMembers.map((gm: { user: { username: any; }; }) => gm.user.username).includes(u.username) === false);
                setPossibleUsers(filtered);
            });
        };
        fetchUsers();
    }, []);


    const element = (
        <Modal
            opened={opened}
            onClose={close}
            title="Add a User to the Group"
            overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
        >
            <Select
                label={`User`}
                placeholder="Pick a user"
                data={possibleUsers.map(u => u.name)}
                value={selectedMember ? selectedMember.user.name : null}
                onChange={(value) => {
                    if (!value) { setSelectedMember(null); return;}

                    const user = possibleUsers.find(u => u.name === value);
                    if (user) {
                        setSelectedMember(prev => ({
                            user: user,
                            roleInGroup: prev?.roleInGroup ?? GROUP_ROLES[0]
                        }));
                    }
                }}
            />

            <Select
                label={`Role in ${form.values.name}`}
                placeholder="Pick a role"
                mt={"md"}
                data={GROUP_ROLES}
                value={selectedMember ? selectedMember.roleInGroup : null}
                onChange={(value) => {
                    if (!value) { setSelectedMember(null); return;}
                    setSelectedMember(prev => {
                        if (!prev) return null;
                        return {
                            ...prev,
                            roleInGroup: value as typeof GROUP_ROLES[number]
                        };
                    });
                }}
            />

            <Button
                mt={"md"}
                w={"100%"}
                variant="light"
                onClick={() => {
                    if (selectedMember) {
                        form.insertListItem("groupMembers", selectedMember);
                        setSelectedMember(null);
                        close();
                    }
                }}
            >
                Add User
            </Button>
        </Modal>
    );

    return { opened, open, close, element };
}