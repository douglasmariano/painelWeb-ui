import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { EstoqueCaboService } from '../estoque-cabo.service';

@Component({
  selector: 'app-estoque-cabo-cadastro',
  templateUrl: './estoque-cabo-cadastro.component.html',
  styleUrls: ['./estoque-cabo-cadastro.component.css']
})
export class EstoqueCaboCadastroComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private estoqueCaboService: EstoqueCaboService,
    private toasty: ToastyService,
    private confirmation:ConfirmationService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  }

}
