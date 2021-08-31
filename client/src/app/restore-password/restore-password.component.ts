import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { RegistrationService } from 'src/services/registration.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html'
})
export class RestorePasswordComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }
  form!: FormGroup;
  aSub!: Subscription;
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required,Validators.minLength(6)]),
      restorePassword: new FormControl(null, [Validators.required,Validators.minLength(6)])

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
      this.restore()
    }

    restore() {
      this.loading = true;
      this.auth.restorePassword(this.form.value)
          .subscribe(
              (data) => {
                console.log(data);
                this.router.navigate(['/login']);
              },
              error => {
                alert(error.message)
                  this.loading = false;
              });
  }

}
