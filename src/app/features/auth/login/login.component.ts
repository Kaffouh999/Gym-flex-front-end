import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from 'src/app/core/models/LoginUser';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-first',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginFirstComponent implements OnInit {

  loginForm: FormGroup;
  

  constructor(private authService:AuthService,private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
            email: ['',[Validators.required, Validators.pattern("^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$")]],
            password: ["", Validators.required],
        });
  }

  login(){
    let email:String = this.loginForm.get("email").value;
    let password:String= this.loginForm.get("password").value;
    let loginUser:LoginUser = {email:email,password:password};
    this.authService.login(loginUser);
  }

}
