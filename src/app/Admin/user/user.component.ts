import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { User } from 'src/core/models/user.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { UserRequest } from 'src/core/models/request/user-request.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService, ConfirmationService,]
})
export class UserComponent {

   public userRequest: UserRequest = <UserRequest>{};

 constructor(
    private readonly apiService: ApiService,
    private messageService: MessageService
  ) { }

  hideDialog() {
    this.updateDialog = false;
  }

  users: User[] = [];

  refresh() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.users = response.data;
    });
  }

  updatedUser: User | null = null;

  updateDialog: boolean = false;

   // ...
  

  editUser(id: number) {
    this.apiService.getEntityById<User>(id, User).then((response) => {
      if (response && response.data) {
        this.updateDialog = true;
        this.updatedUser = response.data;
      } else {
        console.log("Kullanıcı bulunamadı veya bir hata oluştu.");
      }
    })
    this.updateDialog = true;
  }

  onUpdate(id: number, updatedUser: User) {
    this.update(id, updatedUser).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı güncelleme başarılı', life: 3000 });
        this.hideDialog(); // Güncelleme işlemi tamamlandığında dialogu gizle
      }
    }).catch((error) => {
      console.error('Kullanıcı güncellenirken bir hata oluştu:', error);
    });
  }

   //Update işlemini gerçekleştiren kod
   update(id: number, updatedCar: User) {
    return this.apiService.updateEntity(id, updatedCar, User);
  }

  onDelete(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarıyla silindi', life: 3000 });
        this.refresh();
      }
    });
  }

  delete(id: number) {
    return this.apiService.deleteEntity(id, User);
  }

  ngOnInit() {
    this.refresh();
  }

}
