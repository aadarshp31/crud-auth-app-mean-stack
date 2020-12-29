import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup
  isSubmitted: boolean = false

  constructor(private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  signin() {
    this.auth.signin(this.ctrl.email.value.toLowerCase(), this.ctrl.password.value).subscribe(res => {
      console.log(res)
      const data: any = res;
      const { token, user } = data;
      if (localStorage != undefined) {
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('user', JSON.stringify(user))
      }
    })
  }

  onReset() {
    this.isSubmitted = false
    this.signinForm.reset()
  }

  onSubmit() {
    if (this.signinForm.invalid) {
      return
    }
    this.signin()
  }


  public get ctrl() {
    return this.signinForm.controls
  }


}
