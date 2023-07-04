import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit, Input } from '@angular/core';
import { NavbarService } from '@/navbar/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  visibleSidebar1: boolean;

  constructor(private navbar : NavbarService) { }

  ngOnInit(): void {
    
  }
  ativarSideBar(){
    this.navbar.valorVerdadeiro();
  }
  
}
