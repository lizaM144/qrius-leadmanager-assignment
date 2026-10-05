//  our test users and their credentials

import { User, UserRole } from './types';


export const users: Record<UserRole, User> = {
    ADMIN: {
        username: process.env.ADMIN_USERNAME!,
        password: process.env.ADMIN_PASSWORD!,
        role: 'ADMIN',
    },

    AGENT: {
        username: process.env.AGENT_USERNAME!,
        password: process.env.AGENT_PASSWORD!,
        role: 'AGENT',
    },
};