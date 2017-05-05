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

/* adapted from clarity-seed: https://github.com/vmware/clarity-seed */

import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ChartComponent } from './chart/chart.component';
import { UserComponent } from './user/user.component';

export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'chart', component: ChartComponent},
    {path: 'user', component: UserComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
