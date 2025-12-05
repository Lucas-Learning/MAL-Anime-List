import { Routes } from '@angular/router';
import { CallbackComponent } from './callback-component/callback-component';
import { MainPage } from './main-page/main-page';
import { Home } from './home/home';

export const routes: Routes = [

    {path: 'mal-callback', component: CallbackComponent},
    {path: 'main-page', component: MainPage},
    {path: 'home', component: Home}
    
];
