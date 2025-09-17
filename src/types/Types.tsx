

export type SimpleUserT = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    name: string; // This is a combination of firstName and lastName, has to be combinded in frontend
    systemrole: "System-Admin" | "System-Member";
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
        roleInGroup: "Group-Admin" | "Group-Editor" | "Group-Member";
        group: SimpleGroupT;
    }[];
    accessibleApis: ApiSpecT[];
}

export type AggregatedGroupT = SimpleGroupT & {
    members: {
        roleInGroup: "Group-Admin" | "Group-Editor" | "Group-Member";
        user: SimpleUserT;
    }[];
    accessibleApis: ApiSpecT[];
}
