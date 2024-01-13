export enum Role {
    Admin = "Admin",
    User = "User",
    SuperAdmin = "SuperAdmin",
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    city: string;
    country: string;
    phoneNumber: string;
    transactions: string[];
    role: Role;
}
