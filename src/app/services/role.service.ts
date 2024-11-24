import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
// khong co headers do khong yeu cau quyen, duoc bypass
export class RoleService {
    private apiGetRoles = `${enviroment.apiBaseUrl}/roles`;

    constructor(private http: HttpClient) {}

    getRoles(): Observable<any> {
        return this.http.get<any[]>(this.apiGetRoles);
    }
}