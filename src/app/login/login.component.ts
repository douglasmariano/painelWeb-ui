import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  form = null

  ngOnInit(): void {
    this.iniciarForm()
  }

  iniciarForm() {
    this.form = new FormGroup({
      usuario: new FormControl(''),
      senha: new FormControl(''),
      
    });
  }

  fazerLogin() {
    this.loginService.efetuarLogin(this.form.value)
  }

}
