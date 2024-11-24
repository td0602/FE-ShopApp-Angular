import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/user/user.response';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userResponse?: UserResponse | null;
  isPopoverOpen = false
  // khi click vào item nào trên header thì item đó sáng lên
  activeNavItem: number = 0

  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    let userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  togglePopover(event: Event): void {
    event.preventDefault()
    this.isPopoverOpen = !this.isPopoverOpen
  }

  handleItemClick(index: number): void {
    //alert(`Clicked on "${index}"`);
    if (index === 0) {
      // debugger
      this.router.navigate(['/user-profile'])
    } else if (index === 2) { // đăng xuất: xóa tt user trong local storage
      this.userService.removeUserFromLocalStorage()
      this.tokenService.removeToken()
      // cập nhật lại userResponse
      this.userResponse = this.userService.getUserResponseFromLocalStorage()
    }
    this.isPopoverOpen = false // Close the popover after clicking an item
  }


  setActiveNavItem(index: number) {
    this.activeNavItem = index
    //alert(this.activeNavItem);
  }

}
