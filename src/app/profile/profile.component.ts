import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../src/core/services/auth/auth.service';
import { User } from '../../../src/core/models/user.model';
import { Router } from '@angular/router';
import { ApiService } from '../../../src/core/services/api/api.service';
import { ResponseStatus } from '../../../src/core/models/response/base-response.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  currentUser: User | null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.currentUser = null;
  }

  //Update işlemini gerçekleştiren kod
  onUpdate(id: number | undefined, currentUser: User | null) {
    if (id !== undefined && currentUser !== null) {
      this.update(id, currentUser).then(response => {
        if (response?.status == ResponseStatus.Ok) {
          console.log(response.message);
        }
      }).catch((error) => {
        console.error('Kullanıcı güncellenirken bir hata oluştu:', error);
      });
    }
  }
  


  update(id: number, currentUser: User) {
    return this.apiService.updateEntity(id, currentUser, User);
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
}
