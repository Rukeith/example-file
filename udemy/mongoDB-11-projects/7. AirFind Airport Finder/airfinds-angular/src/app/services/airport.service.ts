import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AirportService {

  constructor(private http:Http) { }

  getAirports(){
    return this.http.get('http://localhost:3000/api/airports')
      .map(res => res.json());
  }

  getAirportsByState(state){
    return this.http.get('http://localhost:3000/api/airports/state/'+state)
      .map(res => res.json());
  }
}
