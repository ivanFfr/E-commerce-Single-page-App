import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { routes } from './app.routes';
import { AuthService } from './auth.service'
import { AuthGuard } from 'app/auth.guard';
import { AdminGuard } from 'app/admin.guard';
import { ItemsService } from 'app/shared/model/items-service.service'

import { HeaderComponent } from './views/semantic-elements/header/header.component'
import { NavigationComponent } from './views/semantic-elements/navigation/navigation.component'
import { FooterComponent } from './views/semantic-elements/footer/footer.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { HomeComponent } from './views/home/home.component';
import { MainComponent } from './views/semantic-elements/main/main.component';
import { UserComponent } from './users/user/user.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { ItemDetailsComponent } from './views/item-details/item-details.component';
import { MenComponent } from './views/men/men.component';
import { WomenComponent } from './views/women/women.component';
import { KidsComponent } from './views/kids/kids.component';
import { AdminComponent } from './users/admin/admin.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase, 'E-commerce-Single-page-App'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    routes
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent,
    MainComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    ItemDetailsComponent,
    MenComponent,
    WomenComponent,
    KidsComponent,
    AdminComponent,

  ],
  providers: [AuthService, ItemsService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}

