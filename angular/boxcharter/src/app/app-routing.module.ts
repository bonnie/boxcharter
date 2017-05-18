/*
 * Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.
 *
 * This file is part of BoxCharter.
 *
 * BoxCharter is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * BoxCharter is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { NgModule }              from '@angular/core';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService }      from './auth-guard.service';
import { CanDeactivateGuardService }    from './can-deactivate-guard.service';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ChartComponent } from './chart/chart.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const appRoutes: Routes = [
    {
        path: '', 
        redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'home', 
        component: HomeComponent
    },
    {
        path: 'about', 
        component: AboutComponent
    },
    {
        path: 'user/:id', 
        component: UserComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'chart/:id', 
        component: ChartComponent,
        canDeactivate: [CanDeactivateGuardService]
    },
    { 
        path:'**', 
        component: NotFoundComponent 
    }

];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(
//       appRoutes,
//       { preloadingStrategy: SelectivePreloadingStrategy }
//     )
//   ],
//   exports: [
//     RouterModule
//   ],
//   providers: [
//     CanDeactivateGuard,
//     SelectivePreloadingStrategy
//   ]
// })

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuardService, AuthGuardService
  ]
})

export class AppRoutingModule { }

// export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);


// import { AuthGuard }                from '../auth-guard.service';

// const adminRoutes: Routes = [
//   {
//     path: 'admin',
//     component: AdminComponent,
//     canActivate: [AuthGuard],
//     children: [
//       {
//         path: '',
//         children: [
//           { path: 'crises', component: ManageCrisesComponent },
//           { path: 'heroes', component: ManageHeroesComponent },
//           { path: '', component: AdminDashboardComponent }
//         ],
//       }
//     ]
//   }
// ];

// @NgModule({
//   imports: [
//     RouterModule.forChild(adminRoutes)
//   ],
//   exports: [
//     RouterModule
//   ]
// })
// export class AdminRoutingModule {}