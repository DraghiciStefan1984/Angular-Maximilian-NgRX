import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app/app.reducer';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService,
              private store: Store<{ui: fromRoot.State}>) { }

  ngOnInit(): void 
  {
    this.isLoading$=this.store.select(fromRoot.getIsLoading);
    // this.loadingSubs=this.uiService.loadingStateChanged.subscribe(isLoadingState=>{
    //   this.isLoading=isLoadingState;
    // });
    this.loginForm=new FormGroup({
      email: new FormControl('', {validators:[Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    });
  }

  // ngOnDestroy(): void 
  // {
  //   if(this.loadingSubs) this.loadingSubs.unsubscribe();
  // }

  onSubmit()
  {
    this.authService.login({email: this.loginForm.value.email, password: this.loginForm.value.password});
  }
}