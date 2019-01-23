export interface User {
    username: string;
    password: string;
}

export interface UserToken {
    username: string;
    access_token: string;
    refresh_token: string;
}
