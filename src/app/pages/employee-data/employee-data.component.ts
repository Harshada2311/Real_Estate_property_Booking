import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-data',
  imports: [FormsModule],
  templateUrl: './employee-data.component.html',
  styleUrl: './employee-data.component.css',
  standalone: true
})
export class EmployeeDataComponent implements OnInit {
@ViewChild('empModel') empModel:ElementRef | undefined;
masterServ=inject(MasterService);
http=inject(HttpClient);
employeeList: any []= []
employeeObj: any=
  {
    "employeeId": 0,
    "firstName": "",
    "lastName": "",
    "email": "",
    "contact": "",
    "city": "",
    "address": ""
  }

ngOnInit(){
  this.getEmployeeData();
}

  openModel(){
    if(this.empModel){
      this.empModel.nativeElement.style.display='block';
    }
  }
  closeModel(){
    if(this.empModel){
      this.empModel.nativeElement.style.display='none'; 
    }

  }

  getEmployeeData(){
    this.http.get('http://localhost:5013/api/EmployeeDatas').subscribe((res:any)=>{
      this.employeeList = res;
    })
  }
  onSave(){
    this.http.post('http://localhost:5013/api/EmployeeDatas',this.employeeObj).subscribe((res:any)=>{
      this.getEmployeeData();
      this.closeModel();
    })
  }
  onUpdate(){
    this.http.put('http://localhost:5013/api/EmployeeDatas/' + this.employeeObj.employeeId ,this.employeeObj).subscribe((res:any)=>{
      this.getEmployeeData();
      this.closeModel();
    })
  }
  deleteEmployee(data:any){
    const isdelete = confirm('Are you sure you want to delete this record?');
    if(isdelete){
    this.http.delete('http://localhost:5013/api/EmployeeDatas/'+data.employeeId).subscribe((res:any)=>{
      this.getEmployeeData();
    })
  }
  }
  editEmployee(item:any){
    this.employeeObj = item;
    this.openModel();

  }
}
