import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { PropertiesService } from './properties.service';
 
@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {
 
  constructor(private propertyService: PropertiesService, private authService: AuthenticationService) { }
  properties =  [];
  ngOnInit() {
    this.refresh();
  }
 
  refresh(){
    this.loadProperties();
  }

  logout() {
    this.authService.logout();
  }

  loadProperties(){
    this.propertyService.getProperties().then((res: any) => {
      this.properties = res;
    });
  }
}