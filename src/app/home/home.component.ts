import { Tweet } from 'src/core/models/tweet.model';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { User } from 'src/core/models/user.model';
import { UserRequest } from 'src/core/models/request/user-request.model';
import { TweetRequest } from 'src/core/models/request/tweet-request.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public userRequest: UserRequest = <UserRequest>{};
  public tweetRequest: TweetRequest = <TweetRequest>{};
  
  
  productDialog: boolean = false;

  tweets: Tweet[] = [];
  users: User[] = [];
  updatedUser: User | null = null;
  updateDialog: boolean = false;



 constructor(
    private readonly apiService: ApiService,
    private messageService: MessageService,
  ) { }

  hideDialog() {
    this.updateDialog = false;
  }


  refresh() {
    this.apiService.getAllEntities(Tweet).subscribe((response) => {
      this.tweets = response.data;
    });
  }

  refresh2() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.users = response.data;
    });
  }

  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.apiService.createEntity<TEntity>(entity, entityType);
  }

  onCreate(entity: TweetRequest) {
    this.createEntity<TweetRequest>(entity, 'Tweet').then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Tweet paylaşıldı', life: 3000 });
        this.productDialog = false;

        //Tweet eklendikten sonra orası temizlensin diye
        this.tweetRequest.content= "";     
      }
    });
  }



  ngOnInit() {
    this.refresh();
    this.refresh2();
  }
}

