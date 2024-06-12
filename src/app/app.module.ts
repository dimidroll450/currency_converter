import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { FormComponent } from './form/form.component';
import { CustomTextPipe } from './pipes/custom-text.pipe';
import { CurListComponent } from './cur-list/cur-list.component';

@NgModule({ declarations: [
        AppComponent,
        MainHeaderComponent,
        FormComponent,
        CustomTextPipe,
        CurListComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
