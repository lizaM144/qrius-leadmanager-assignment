// a user looks like in our system

export type UserRole = 'ADMIN' | 'AGENT';

export interface User {
    username: string;
    password: string;
    role: UserRole;
}