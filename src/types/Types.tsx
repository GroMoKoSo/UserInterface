export const GROUP_ROLES = ["group-member", "group-editor", "group-admin"] as const;
export type GroupRolesT = typeof GROUP_ROLES[number];
export const COLORS_GROUP_ROLES: Record<GroupRolesT, string> = {
    "group-member": "#2980B9",
    "group-editor": "#27AE60",
    "group-admin": "#E74C3C",
};


export const SYSTEM_ROLES = ["system-member", "system-admin"] as const;
export type SystemRolesT = typeof SYSTEM_ROLES[number];
export const COLORS_SYSTEM_ROLES: Record<SystemRolesT, string> = {
    "system-admin": "#8E44AD",  // purple
    "system-member": "#16A085", // teal
};


export const GROUP_TYPES = ["public", "private"] as const;
export type GroupTypesT = typeof GROUP_TYPES[number];
export const COLORS_GROUP_TYPES: Record<GroupTypesT, string> = {
    "public": "#2ECC71",  // green
    "private": "#34495E", // dark gray
};


export const API_ACCESS_TYPES = ["user", "group"] as const;
export type ApiAccessTypesT = typeof API_ACCESS_TYPES[number];
export const COLORS_API_ACCESS_TYPES: Record<ApiAccessTypesT, string> = {
    "user": "#3498DB",  // blue
    "group": "#9B59B6", // violet
};



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
