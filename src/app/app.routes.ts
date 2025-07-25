import { Routes } from '@angular/router';


import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Products } from './pages/products/products';


import { Data } from './pages/data/data';
import { Dispaly } from './pages/dispaly/dispaly';
import { Info } from './pages/info/info';

export const routes: Routes = [
  // ✅ Redirect to 'about' on app start
  

  { path: '', component: About },
  { path: 'contact', component: Contact },
  { path: 'products', component: Products },
  
 
  { path: 'data', component: Data },
  { path: 'info', component: Info },
  { path: 'display', component: Dispaly },

  // ✅ Lazy-loaded routes
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search-results/search-results').then(m => m.SearchResultsComponent)
  }
];
