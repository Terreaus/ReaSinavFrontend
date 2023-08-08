import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CardModule } from 'primeng/card';
import { NgFor } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ProductService } from 'src/core/services/productservice';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { JwtInterceptor } from 'src/core/interceptors/jwt.interceptor';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/core/services/auth/auth.service';
import { BarComponent } from './Admin/bar/bar.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { UserComponent } from './Admin/user/user.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BarComponent,
    AdminHomeComponent,
    UserComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    PasswordModule,
    InputMaskModule,
    InputNumberModule,
    DropdownModule,
    MessagesModule,
    CascadeSelectModule,
    CardModule,
    NgFor,
    TabViewModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    TagModule,
    DialogModule,
    RatingModule,
    InputTextareaModule,
    AccordionModule,
    CarouselModule,
    CommonModule,
  ],
  providers: [AuthService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DatePipe
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
