export const GROUP_ROLES = ["Group-Admin", "Group-Editor", "Group-Member"] as const;
export const SYSTEM_ROLES = ["System-Admin", "System-Member"] as const;
export const GROUP_TYPES = ["Public", "Private"]

export const API_ACCESS_TYPES = ["User", "GROUP"] as const;

export type GroupRolesT = typeof GROUP_ROLES[number];
export type SystemRolesT = typeof SYSTEM_ROLES[number];
export type GroupTypesT = typeof GROUP_TYPES[number];
export type ApiAccessTypesT = typeof API_ACCESS_TYPES[number];

export type SimpleUserT = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    name: string; // This is a combination of firstName and lastName, has to be combinded in frontend
    systemrole: SystemRolesT
}

export type SimpleGroupT = {
    name: string;
    description: string;
    type: GroupTypesT;
}

export type ApiSpecT = {
    id: number;
    name: string;
    description: string;
    version: string;
    dataFormat: string;
    spec: string;
}

export type ApiAccessT = {
    api: number;
    accessVia: ApiAccessTypesT; 
    activated: boolean;
}

export type GroupMemershipT = {
    roleInGroup: GroupRolesT;
    group: SimpleGroupT;
}[];

export type AggregatedUserT = SimpleUserT & {
    groupMemberships: GroupMemershipT;
    accessibleApis: ApiSpecT[];
}

export type GroupMemberT = {
    roleInGroup: GroupRolesT;
    user: SimpleUserT;
}[];

export type AggregatedGroupT = SimpleGroupT & {
    groupMembers: GroupMemberT;
    accessibleApis: ApiAccessT[];
}
