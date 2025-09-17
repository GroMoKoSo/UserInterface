export const GROUP_ROLES = ["Group-Admin", "Group-Editor", "Group-Member"] as const;
export const SYSTEM_ROLES = ["System-Admin", "System-Member"] as const;
export const GROUP_TYPES = ["Public", "Private"]

export type GroupRolesT = typeof GROUP_ROLES[number];
export type SystemRolesT = typeof SYSTEM_ROLES[number];
export type GroupTypesT = typeof GROUP_TYPES[number];

export type SimpleUserT = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    name: string; // This is a combination of firstName and lastName, has to be combinded in frontend
    systemrole: SystemRolesT
}

export type SimpleGroupT = {
    id: number;
    name: string;
    type: "Private" | "Public";
    size: number; // has to be calculated in frontend
}

export type ApiSpecT = {
    id: number;
    name: string;
    description: string;
    version: string;
    dataFormat: string;
    spec: string;
}


export type AggregatedUserT = SimpleUserT & {
    groupMemberships: {
        roleInGroup: GroupRolesT;
        group: SimpleGroupT;
    }[];
    accessibleApis: ApiSpecT[];
}

export type AggregatedGroupT = SimpleGroupT & {
    members: {
        roleInGroup: GroupRolesT;
        user: SimpleUserT;
    }[];
    accessibleApis: ApiSpecT[];
}
