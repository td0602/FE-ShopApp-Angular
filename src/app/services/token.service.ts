// lưu lại token
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    // dang key-value
    private readonly TOKEN_KEY = 'access_roken';
    constructor() {

    }
//  getter and setter
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }
    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
}