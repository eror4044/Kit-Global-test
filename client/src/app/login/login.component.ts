import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit,OnDestroy {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.minLength(6)])
  });
  loading = false;
  returnUrl: string | undefined;

  aSub: Subscription = new Subscription;
  constructor(
    public auth:AuthService,
    private router:Router,
    private route:ActivatedRoute) { }

    ngOnDestroy(){
      if(this.aSub){
        this.aSub.unsubscribe()
      }
    }
    ngOnInit() {
      this.auth.logout()
      this.route.queryParams.subscribe((params:Params)=>{
        if(params['registered']){
          //теперь вы можете зайти в систму используя свои данные
          alert('registered')

        }else if(params['accessDenied'] == true){
          alert('accessDenied')
        }
      })
    }
    onSubmit(){
      this.login()
    }
    login() {
      this.loading = true;
      this.auth.login(this.form.value)
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.loading = false;
              });
  }

}
