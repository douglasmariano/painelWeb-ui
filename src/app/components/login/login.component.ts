import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { data } from 'jquery';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  form = null;
  error;

  ngOnInit(): void {
    this.iniciarForm()
  }

  iniciarForm() {
    this.form = new FormGroup({
      usuario: new FormControl(''),
      senha: new FormControl(''),
      
    });
    
  }
  
  inputChangeUsuario(event) { 
    this.form.get('usuario').setValue(event.target.value);    
    }

    inputChangeSenha(event) { 
      this.form.get('senha').setValue(event.target.value);      
    }

  async fazerLogin(): Promise<void> {
    this.error = '';
    this.error = await this.loginService.efetuarLogin(this.form.value)
  }

}
