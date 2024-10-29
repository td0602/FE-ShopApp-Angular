import { Component, OnInit, ViewChild } from '@angular/core';
// import them
import { NgForm } from '@angular/forms';
// nhay giao dien
import { Router } from '@angular/router' 
// import { error } from 'console';
import {UserService} from '../services/user.service'
// import { error } from 'console';
import { RegisterDTO } from '../dtos/user/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // bien tham chieu toi form, ! la chac chan trong file html co the form nay roi (khac null)
  @ViewChild(`registerForm`) registerForm!: NgForm;
  // Khai baso các biến, trường dữ liệu tương ứng trong form
  phoneNumber: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;

  constructor(
    private router: Router,
    private userService: UserService 
  ) {
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.isAccepted=true;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
   }

  ngOnInit(): void {
  }
// data binding 2 chieu, bat su kien khi go
  onPhoneNumberChange() { //hien thi thay doi khi go trong f12
    console.log(`Phone typed: ${this.phoneNumber}`)
    // phone must be at least 6 character
  }
  register() {
    const message = `phone: ${this.phoneNumber}` + 
                    `password: ${this.password}` + 
                    `retypePassword: ${this.retypePassword}` + 
                    `address: ${this.address}` + 
                    `fullName: ${this.fullName}` + 
                    `isAccepted: ${this.isAccepted}` + 
                    `dateOfBirth: ${this.dateOfBirth}`;
    // alert(message);
    debugger
    const registerDTO: RegisterDTO = {
      "fullname": this.fullName,
      "phone_number": this.phoneNumber,
      "address": this.address,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1
    }
    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        debugger
        this.router.navigate(['/login']);
      },
      complete: () => {
         debugger
      },
      error: (error: any) => {
        alert(`Cannot register, error: ${error.error}`)
      }
    })
  }
  // check password match retypePassword
  checkPasswordMatch() {
    if(this.password !== this.retypePassword) {
      // tao doi tuong Error cos key: passWordMismatch value: true
      this.registerForm.form.controls['retypePassword'].setErrors({'passwordMismatch': true});
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }

  checkAge() {
    if(this.dateOfBirth) { // neu co truong dateOfBirth
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if(age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({'invalidAge': true});
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }
}
