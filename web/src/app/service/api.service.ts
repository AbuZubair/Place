import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()

export class ApiService {

  baseUrl = 'http://localhost/ws_masakindo/'
  constructor(private http: HttpClient,  private spinner: NgxSpinnerService) { }
  
  getProv(){
    return this.http.get(this.baseUrl+'ws/global_ws/get_prov', {responseType: 'text'});
  }

  getRegency(prov){
    return this.http.get(this.baseUrl+'ws/global_ws/get_regency?q='+prov,{responseType: 'text'});
  }
    
  getMaster(param){
    let httpParams = new HttpParams();
    Object.keys(param).forEach(function (key) {
      if(param[key]!='s')httpParams = httpParams.append(key, param[key]);
    });
    let url = (param['s']=='Kota')?this.baseUrl+'/ws/global_ws/get_regency':this.baseUrl+'/ws/global_ws/get_district';
    return this.http.get(url,{ params: httpParams } );
  }
  
  
}