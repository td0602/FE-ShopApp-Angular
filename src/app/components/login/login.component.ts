import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/user/login.dto';
// import { error } from 'console';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { LoginResponse } from 'src/app/responses/user/login.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm! : NgForm;

  phoneNumber: string ='33445566'; // cap luon gia tri mac dinh
  password: string ='123456';

  constructor( // Inject
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
  }

  login() {
    const message = `phone: ${this.phoneNumber}` + 
                    `password: ${this.password}`;
    // alert(message)
    debugger

    const loginDTO: LoginDTO = {
      "phone_number": this.phoneNumber,
      "password": this.password
    }

    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger
        // lấy token từ server BE để lưu lại sủ dụng trong các yêu cầu API khác -> gắn vào headers
        const {token} = response;
        this.tokenService.setToken(token);
        // this.router.navigate(['/login'])
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        alert('')
      }

    });
  }

  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.phoneNumber}`)
  }

}
