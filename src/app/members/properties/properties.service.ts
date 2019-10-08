import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

const PROPERTIES_PATH = `${environment.BASE_API_PATH}/api/properties`;
const ADD_PROPERTY_PATH = `${environment.BASE_API_PATH}/api/property/create`;
const EDIT_PROPERTY_PATH = `${environment.BASE_API_PATH}/api/property/update`;
const DELETE_PROPERTY_PATH = `${environment.BASE_API_PATH}/api/property/delete`;

const ADD_UNIT_PATH = `${environment.BASE_API_PATH}/api/property/:id/unit/create`;


export interface Unit {
  number: string;
  floor: number;
  rent: number;
  vacant?: boolean;
}

export interface Property {
  _id?: string; // Assigned automatically by datastore
  name: string;
  address: string;
  units: Unit[];
}


@Injectable()
export class PropertiesService {

  constructor(
    private http: HttpClient, private authService: AuthenticationService
  ) { }

  public async getProperties(query: any = {}, params: { limit: number; offset: number } = { limit: 100, offset: 0 }): Promise<Property[]> {
    const user = await this.authService.getUser();
    const token = user.token ? user.token : '';
    return this.http.post<Property[]>(PROPERTIES_PATH, query, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      params: {
        limit: `${params.limit}`,
        offset: `${params.offset}`
      }
    }).toPromise();
  }

  public addProperty(property: Property) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : '';
    return this.http.post<Property>(ADD_PROPERTY_PATH, property, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    });
  }

  public editProperty(property: Property) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : '';
    return this.http.post<Property>(EDIT_PROPERTY_PATH, property, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    });
  }

  public addUnit(property_id: string, unit: Unit) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : '';
    const unitPath = ADD_UNIT_PATH.replace(':id', property_id);
    return this.http.post<Property>(unitPath, { property_id: property_id, unit: unit }, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    });
  }

  public delete(property: Property) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : '';
    return this.http.delete(DELETE_PROPERTY_PATH, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      params: {
        property: JSON.stringify(property),
      }
    });
  }
}
