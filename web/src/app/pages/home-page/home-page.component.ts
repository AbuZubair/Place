import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../../service/api.service';
import { NgxSpinnerService } from "ngx-spinner";

import { DataTableDirective } from 'angular-datatables';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  selected:any = 'Kota';
  province:any = '31';
  city:any
  data:any;
  show:boolean = false;
  not_found:boolean = false;

  public selectData: Array<Select2OptionData>;
  public provinceData: Array<Select2OptionData>;
  public cityData: Array<Select2OptionData>;

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { 
    this.selectData = [
      {
        id:'Kota',
        text: 'Kota'
      },
      {
        id:'Kecamatan',
        text: 'Kecamatan'
      },
    ]
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };

    this.getProvince().then((val:any) => {
      var i;
      for(i = 0; i < val.length; i++){
          val[i].text = val[i]['name'];
          delete val[i].name;
      }
      this.provinceData = val;
      
      this.getData(this.selected).then((v:any) => {
        this.data = v;
        for(i = 0; i < v.length; i++){
          v[i].text = v[i]['name'];
          delete v[i].name;
        }
        this.cityData = v;
        this.spinner.hide();
        this.dtTrigger.next();
      });

    });
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

  getProvince(){
    return new Promise((resolve, reject) => {
      this.apiService.getProv().subscribe((val: any)=>{
        var res = JSON.parse(val);
        if(res.status=='200'){
          resolve(res.data);
        }
      }, (err) => {
        this.not_found = true;
        alert('error')
        reject(err)
      });
    });
  }

  getCity(){
    return new Promise((resolve, reject) => {
      this.apiService.getRegency(this.province).subscribe((val: any)=>{
        var res = JSON.parse(val);
        if(res.status=='200'){
          resolve(res.data);
        }
      }, (err) => {
        this.not_found = true;
        alert('error')
        reject(err)
      });
    });
  }

  getData(s){
    this.spinner.show();
    return new Promise((resolve, reject) => {
      let params = {
        'q' : (s=='Kota')?this.province:this.city,
        's' : s
      }
      this.apiService.getMaster(params).subscribe((val: any)=>{
        console.log(val);
        if(val.status=='200'){
          resolve(val.data);
        }
      }, (err) => {
        this.not_found = true;
        alert('error')
        this.spinner.hide();
        reject(err)
      });
    });
  }

  changedSelected(e){
    this.selected = e;
    if(e!='Kota'){
      this.show = true;
    }else{
      this.show = false;
    }

    this.getData(this.selected).then((val:any) => {
      this.data = val;
     this.spinner.hide();
     this.rerender();
   });
  }

  changedProvince(e){
    console.log(e)
    this.province = e;
    if(this.selected=='Kota'){
      this.getData(this.selected).then((val:any) => {
         this.data = val;
        this.spinner.hide();
        this.rerender();
      });
    }else{
      this.getCity().then((val:any) => {
        var i;
        for(i = 0; i < val.length; i++){
            val[i].text = val[i]['name'];
            delete val[i].name;
        }
        this.cityData = val;  
      });
    }
  }

  changedCity(e){
    this.city = e;
    this.getData(this.selected).then((val:any) => {
        this.data = val;
      this.spinner.hide();
      this.rerender();
    });
    
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
