import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoginDTO } from '../dtos/user/login.dto';
// import { error } from 'console';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm! : NgForm;

  phoneNumber: string ='33445566'; // cap luon gia tri mac dinh
  password: string ='123456';

  constructor(
    private router: Router,
    private userService: UserService
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
      next: (response: any) => {
        debugger
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
