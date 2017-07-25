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

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';

import { AppRoutingModule } from "./routing/app-routing.module";
import { LoginRoutingModule } from "./routing/login-routing.module";

import { AppComponent } from './app.component';
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { UserComponent } from './components/user/user.component';
import { ChartComponent } from './components/chart/chart.component';
import { StatusComponent } from './components/status/status.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { UserChartsComponent } from './components/user-charts/user-charts.component';

import { FillPipe } from './pipes/fill.pipe';
import { KeysPipe } from './pipes/keys.pipe';

import { StatusService } from './services/status.service';
import { DialogService } from './services/dialog.service';
import { ErrorService } from './services/error.service';
import { AuthService } from './services/auth.service';
import { ChartService } from './services/chart.service';
import { LoginRegisterService } from './services/login-register.service';

import { statusStrings } from './model/status'

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        UserComponent,
        ChartComponent,
        FillPipe,
        KeysPipe,
        StatusComponent,
        LoginComponent,
        NotFoundComponent,
        RegisterComponent,
        LoginRegisterComponent,
        UserChartsComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        // LoginRoutingModule,
        AppRoutingModule
    ],

    // injecting global services here
    providers: [
        StatusService,
        DialogService,
        ErrorService,
        AuthService,
        LoginRegisterService,
        ChartService
    ],

    bootstrap: [ AppComponent ],
})
export class AppModule {
}
