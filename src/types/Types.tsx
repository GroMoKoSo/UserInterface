

export type UserT = {
    id: number;
    firstName: string;
    lastName: string;
    name: string; // This is a combination of firstName and lastName
    role: "Admin" | "Manager" | "User";
    email: string;
    groups: {
        id: number;
        role: "Admin" | "User";
    }[]
}

export type GroupT = {
    id: number;
    name: string;
}

export type ApiSpecT = {
    id: number;
    name: string;
    description: string;
    version: string;
    dataFormat: string;
    spec: string;
}