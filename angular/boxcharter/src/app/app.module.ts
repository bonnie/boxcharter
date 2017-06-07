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
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { LoginRoutingModule } from "./login-routing.module";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { UserComponent } from './user/user.component';
import { ChartComponent } from './chart/chart.component';
import { FillPipe } from './pipes/fill.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { StatusComponent } from './status/status.component';
import { StatusService } from './status.service';
import { DialogService } from './dialog.service';
import { ErrorService } from './error.service';
import { AuthService } from './auth.service';
import { ChartService } from './chart.service';
import { LoginRegisterService } from './login-register.service';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginRegisterComponent } from './login-register/login-register.component';

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
        LoginRegisterComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        LoginRoutingModule,
        AppRoutingModule
    ],
    
    // injecting StatusService and AuthService here, so there's a global service shared by the whole app
    providers: [ StatusService, DialogService, ErrorService, AuthService, LoginRegisterService, ChartService ],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}