import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Toast } from 'bootstrap';
import { Router } from '@angular/router';
import { LazyloaderService } from 'src/app/services/lazyloader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  signUpSuccessMessage: string = "";
  signUpErrorMessage: string = "";
  showError: boolean = false;
  
  constructor(private fb: FormBuilder,private _authService:AuthService,private _router: Router,private _lazyloader: LazyloaderService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      role: ['Guest'],
      userName: ['',[Validators.required,Validators.maxLength(30)]],
      password: ['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"),Validators.maxLength(10)]],
      confirmPassword: ['',Validators.required]
    })
  }

  /* function for user registration */
  registerUser(val:any) {
    this._authService.registerUser(val.value).subscribe((response) => {
      localStorage.setItem("token",response.token);
      localStorage.setItem("role",response.userRole);
      this.signUpSuccessMessage = response.message;
      this.showToast();
      this.signUpForm.reset();
    },
    (error) => {
      this.showError = true;
      this.signUpErrorMessage = error;
      this.showToast();
    })
  }

  /* function for showing bootstrap toaster */
  showToast() {
    const toastLiveExample = document.getElementById('liveToast');
    const toast = new Toast(toastLiveExample);
    toast.show();
    if(!this.showError) {
      this._lazyloader.loadLazyModules().subscribe(() => {
        const config = this._router.config;
        config.push({
          path: 'dashboard',
          loadChildren: () => this._lazyloader.getLazyModule('dashboard')
        });
        this._router.resetConfig(config);
        this._router.navigate(['dashboard']);
      })
    }
  }

}
