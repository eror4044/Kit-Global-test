import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { RegistrationService } from 'src/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit,OnDestroy {

  constructor(private router:Router,private reg:RegistrationService) { }
  form!: FormGroup;
  aSub!: Subscription;
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(6)])
    })
  }
  loading = false;
    ngOnDestroy(){
      if(this.aSub){
        this.aSub.unsubscribe()
      }
    }
    onSubmit(){
      this.loading = true;
      this.register()
    }

    register() {
      this.loading = true;
      this.reg.create(this.form.value)
          .subscribe(
              (data) => {
                alert(data)
                this.router.navigate(['/login']);
              },
              error => {
                alert(error.message)
                  this.loading = false;
              });
  }


}


