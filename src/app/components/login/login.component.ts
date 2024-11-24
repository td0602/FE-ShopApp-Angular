import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/user/login.dto';
// import { error } from 'console';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { LoginResponse } from 'src/app/responses/user/login.response';
// import { error } from 'console';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';
import { UserResponse } from 'src/app/responses/user/user.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm! : NgForm;

  // Login user
  // phoneNumber: string ='33445566'; // cap luon gia tri mac dinh
  // password: string ='123456';

  // login admin
  phoneNumber: string = '11223344';
  password: string = '11223344';

  roles: Role[] = [];
  rememberMe: boolean =true;
  selectedRole: Role | undefined; // biến lưu giá trị được chọn từ dropdown
  userResponse?: UserResponse;

  constructor( // Inject
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void { // dữ liệu tự động load khi sang trang này
    // gọi API lấy danh sách roles và lưu vào biến roles
    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => { // sd kieu Role
        debugger
        this.roles = roles;
        // mặc định lấy role đầu tiên
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      complete: () => {
        debugger
      }, 
      error: (error: any) => {
        debugger
        console.error(`Error getting roles: `, error);
      }
    });
  }

  createAccount() {
    debugger
    // Chuyển hướng người dùng đến trang đăng ký (hoặc trang tạo tài khoản)
    this.router.navigate(['/register']); 
  }

  login() {
    const message = `phone: ${this.phoneNumber}` + 
                    `password: ${this.password}`;
    // alert(message)
    debugger

    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    }

    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger
        // lấy token từ server BE để lưu lại sủ dụng trong các yêu cầu API khác -> gắn vào headers
        const {token} = response;
        // this.tokenService.setToken(token);
        if(this.rememberMe) { // nếu tích vào ô ghi nhớ sẽ lưu token lại
          this.tokenService.setToken(token);
          debugger
          this.userService.getUserDatail(token).subscribe({
            // response: any --> do dữ liệu BE gửi sang có một số kiểu FE không convert dc ta phải convert tay
            next: (response: any) => {
              debugger
              this.userResponse = {
                // gán tất cả các giá trị từ response vào userResponse, rieng trường date_of_birth là converrt lại
                ...response,
                date_of_birth: new Date(response.date_of_birth),
              };    
              // lưu userResponse vào storage
              this.userService.saveUserResponseToLocalStorage(this.userResponse); 
              // khi bấm đăng nhập nhảy tùy vào role mà navigate tương ứng
              if(this.userResponse?.role.name == 'admin') {
                this.router.navigate(['/admin']);    
              } else if(this.userResponse?.role.name == 'user') {
                this.router.navigate(['/']);                      
              }
            },
            complete: () => {
              debugger
            },
            error: (error: any) => {
              debugger
              alert(error?.error.message);
            }
          })
        }
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        debugger
        alert(error?.error.message);
      }

    });
  }

  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.phoneNumber}`)
  }

}
