import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
    private route: ActivatedRoute) {
  }

  exams;
  form = null;
  error;

  ngOnInit(): void {
    this.iniciarForm()     
  }

  iniciarForm() {
    this.form = new UntypedFormGroup({
      usuario: new UntypedFormControl(''),
      senha: new UntypedFormControl(''),
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
    const nextUrl = this.route.snapshot.queryParams.nextUrl;
    this.error = await this.loginService.efetuarLogin(this.form.value, nextUrl)
  }

}
