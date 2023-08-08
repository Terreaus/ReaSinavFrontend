import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from 'src/core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent {
  items: MenuItem[] | undefined;

  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { this.currentUser = null }

  ngOnInit() { //Buradaki fonsiyon admin'e normal user'in girmesini ekleyen fonksiyon, normal şartlarda "0" olmalı ve admin dışı almamalı ama
    this.authService.currentUser.subscribe(user => { // şu anda çalıştıramadım o yüzden "1" ile giriş sağlatıyrum
      this.currentUser = user;
      if (this.currentUser?.userType === 1 || this.currentUser == null) {
        this.router.navigate(['/home']);
      }
    });



    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/admin',
      },
      {
        label: 'User',
        icon: 'pi pi-user-edit',
        routerLink: '/admin/user',
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout(),
      }
    ];
  }

  logout() {
    this.authService.logOut();
  }
}
