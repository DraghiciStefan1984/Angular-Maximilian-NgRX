import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
    declarations:[LoginComponent, SignupComponent],
    imports: [ReactiveFormsModule, MaterialModule, 
            FlexLayoutModule, AngularFireAuthModule,
    ],
    exports: []
})
export class AuthModule{}