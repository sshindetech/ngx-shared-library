
export interface IAuthService {
    login(username: string, password: string): void;
    logout(): void;
    isAuthenticated(): boolean;
    saveAccessToken(access_token: string): void;
    removeAccessToken(): void;
    getAccessToken(): string | null;
}