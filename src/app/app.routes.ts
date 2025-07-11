import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { OrderHistory } from './pages/order-history/order-history';
import { Profile} from './pages/profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact},
  { path: 'products', component: Products },
  { path: 'cart', component: Cart },
  { path: 'order-history', component: OrderHistory },
  { path: 'profile', component: Profile },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search-results/search-results').then(m => m.SearchResultsComponent)
  }
];
