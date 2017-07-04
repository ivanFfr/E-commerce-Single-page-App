import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth.service'
import { AuthGuard } from 'app/auth.guard';
import { AdminGuard } from 'app/admin.guard';

import { NotFoundComponent } from './views/not-found/not-found.component';
import { HomeComponent } from './views/home/home.component';
import { MenComponent } from './views/men/men.component';
import { WomenComponent } from './views/women/women.component';
import { KidsComponent } from './views/kids/kids.component';
import { ItemDetailsComponent } from './views/item-details/item-details.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { UserComponent } from './users/user/user.component';
import { AdminComponent } from './users/admin/admin.component';

export const router: Routes = [
    { path: '', redirectTo: 'store', pathMatch: 'full' },
    {
        path: 'store',
        children: [
            {
                path: 'men',
                children: [
                    { path: ':id', component: ItemDetailsComponent },
                    { path: '', component: MenComponent },
                ]
            },

            {
                path: 'women',
                children: [
                    { path: ':id', component: ItemDetailsComponent },
                    { path: '', component: WomenComponent },
                ]
            },

            {
                path: 'kids',
                children: [
                    { path: ':id', component: ItemDetailsComponent },
                    { path: '', component: KidsComponent },
                ]
            },
            { path: '', component: HomeComponent },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'user',
        children: [
            { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'additem', component: AdminComponent, canActivate: [AdminGuard] },
    { path: '**', component: NotFoundComponent },
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
