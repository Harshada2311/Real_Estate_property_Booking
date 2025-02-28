import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PropertyComponent } from './pages/property/property.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { SiteComponent } from './pages/site/site.component';
import { BookingComponent } from './pages/booking/booking.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },   
    {
        path: '',
        component: LayoutComponent,
        children:[
            {
                path:'dashboard',
                component: DashboardComponent
            },
            {
                path: 'property-type',
                component: PropertyComponent
            },
            {
                path: 'site-master',
                component: SiteComponent
            },
            {
                path:'Booking',
                component: BookingComponent,
                title:'Booking'
            }
        ]
    }
];
