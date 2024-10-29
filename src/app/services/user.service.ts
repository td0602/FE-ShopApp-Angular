import { Injectable } from '@angular/core';
// import
// gan API
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { enviroment } from '../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiRegister = `${enviroment.apiBaseUrl}/users/register`;
  private apiLogin = `${enviroment.apiBaseUrl}/users/login`;
     
  private apiConfig = {
    headers: this.createHeaders(),
  }

  constructor(
    // inject
    private http: HttpClient
  ) { }

  createHeaders(): HttpHeaders {
    return new HttpHeaders({'COntent-Type': 'application/json'});
  }

  register(registerDTO: RegisterDTO): Observable<any> { // Observable<any> la gia trij return 
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }
}
