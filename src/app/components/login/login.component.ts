import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from 'bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { LazyloaderService } from 'src/app/services/lazyloader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginErrorMessage: string = "";
  loginSuccessMessage: string = "";
  showError: boolean = false;
  
  constructor(private fb: FormBuilder,private _authService:AuthService,private _lazyLoaderService:LazyloaderService,private _router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['',[Validators.required,Validators.maxLength(30)]],
      password: ['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"),Validators.maxLength(10)]],
    })
  }

  /* function for user login */
  loginUser(val:any) {
    this._authService.loginUser(val.value).subscribe((response) => {
      localStorage.setItem("token",response.token);
      localStorage.setItem("role",response.userRole);
      localStorage.setItem("username",val.value.userName);
      this.loginSuccessMessage = response.message;
      this.showToast();
      this.loginForm.reset();
    },
    (error) => {
      this.showError = true;
      this.loginErrorMessage = error;
      this.showToast();
    })
  }

  /* function for showing bootstrap toaster */
  showToast() {
    const toastLiveExample = document.getElementById('liveloginToast');
    const toast = new Toast(toastLiveExample);
    toast.show();
    if(!this.showError) {
      this._lazyLoaderService.loadLazyModules().subscribe(() => {
        const config = this._router.config;
        config.push({
          path: 'dashboard',
          loadChildren: () => this._lazyLoaderService.getLazyModule('dashboard')
        });
        this._router.resetConfig(config);
        this._router.navigate(['dashboard']);
      })
    }
  }

}
