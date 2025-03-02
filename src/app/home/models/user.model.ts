export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
} 

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}