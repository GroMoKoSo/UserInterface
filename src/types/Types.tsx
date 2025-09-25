export const GROUP_ROLES = ["member", "editor", "admin"] as const;
export type GroupRolesT = typeof GROUP_ROLES[number];
export const COLORS_GROUP_ROLES: Record<GroupRolesT, string> = {
    "member": "#2980B9",
    "editor": "#27AE60",
    "admin": "#E74C3C",
};


export const SYSTEM_ROLES = ["member", "admin"] as const;
export type SystemRolesT = typeof SYSTEM_ROLES[number];
export const COLORS_SYSTEM_ROLES: Record<SystemRolesT, string> = {
    "admin": "#8E44AD",  // purple
    "member": "#16A085", // teal
};


export const GROUP_TYPES = ["public", "private"] as const;
export type GroupTypesT = typeof GROUP_TYPES[number];
export const COLORS_GROUP_TYPES: Record<GroupTypesT, string> = {
    "public": "#2ECC71",  // green
    "private": "#7F8C8D", // gray with good contrast
};


export const API_ACCESS_TYPES = ["user", "group"] as const;
export type ApiAccessTypesT = typeof API_ACCESS_TYPES[number];
export const COLORS_API_ACCESS_TYPES: Record<ApiAccessTypesT, string> = {
    "user": "#3498DB",  // blue
    "group": "#9B59B6", // violet
};

export const API_ACTIVATION_TYPES = ["active", "inactive"] as const;
export type ApiActivationTypesT = typeof API_ACTIVATION_TYPES[number];
export const COLORS_PI_ACTIVATION_TYPES: Record<ApiActivationTypesT, string> = {
    "active": "#2ECC71",  // green
    "inactive": "#7F8C8D", // gray
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

export type AggregatedApiT = ApiSpecT & ApiAccessT & {
    activationStatus: ApiActivationTypesT;
}

export type GroupMemershipT = {
    roleInGroup: GroupRolesT;
    group: SimpleGroupT;
}[];

export type AggregatedUserT = SimpleUserT & {
    groupMemberships: GroupMemershipT;
    accessibleApis: AggregatedApiT[];
}

export type GroupMemberT = {
    roleInGroup: GroupRolesT;
    user: SimpleUserT;
}[];

export type AggregatedGroupT = SimpleGroupT & {
    groupMembers: GroupMemberT;
    accessibleApis: AggregatedApiT[];
}
