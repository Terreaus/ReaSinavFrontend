import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import * as $ from 'jquery';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginRequest: LoginRequest = <LoginRequest>{};
  public registerRequest: RegisterRequest = <RegisterRequest>{};

  private panelOne: number | undefined;
  private panelTwo: number | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.panelOne = $('.form-panel.two').height();
    this.panelTwo = $('.form-panel.two')[0].scrollHeight;

    this.setupFormPanelAnimations();
  }

  private setupFormPanelAnimations(): void {
    $('.form-panel.two').not('.form-panel.two.active').on('click', (e) => {
      e.preventDefault();

      $('.form-toggle').addClass('visible');
      $('.form-panel.one').addClass('hidden');
      $('.form-panel.two').addClass('active');
      $('.form').animate({
        'height': this.panelTwo
      }, 200);
    });

    $('.form-toggle').on('click', (e) => {
      e.preventDefault();
      $(this).removeClass('visible');
      $('.form-panel.one').removeClass('hidden');
      $('.form-panel.two').removeClass('active');
      $('.form').animate({
        'height': this.panelOne
      }, 200);
    });
  }

  async login() {
    let status = await this.authService.login(this.loginRequest);

    if (status === ResponseStatus.Ok) { //Eğer giriş başarılıysa toast mesaj halinde başarılı mesajı gelmeli ve 1 saniye içinde home a atmalı
      await this.router.navigate(['']);
      setTimeout(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'doğru giriş' });
        this.router.navigate(['/home']); // Giriş doğruysa /homepage'e yönlendir
      }, 1000 ); // 1 saniye (2000 milisaniye) bekletir
    } else if (status === ResponseStatus.Invalid) {
      this.loginRequest.password = '';
      this.messageService.add({ severity: 'error', summary: 'Error', detail: ' hatalı giris' });
    }
  }

  async register() {
    let status = await this.authService.register(this.registerRequest);

    if (status == ResponseStatus.Ok) {
      await this.router.navigate(['']);
    } else if (status == ResponseStatus.Invalid)
      this.registerRequest.password = '';
  }

}
