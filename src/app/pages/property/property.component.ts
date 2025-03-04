import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { IAPIResponseModel, IpropertyType } from '../../models/master';

@Component({
  selector: 'app-property',
  imports: [ReactiveFormsModule],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})
export class PropertyComponent implements OnInit {

  form: FormGroup = new FormGroup({

  });
  gridData: IpropertyType[] = []
  masterServ = inject(MasterService);

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getGridData();
  }

  getGridData() {
    this.masterServ.getAllPropertyType().subscribe((res: IAPIResponseModel) => {
      console.log("API Response:", res); // Log the API response for debugging
      this.gridData = res.data; // Assign the data to gridData
    });
  }

  onSave() {
    this.masterServ.savePropertyTye(this.form.value).
      subscribe((res: IAPIResponseModel) => {
        if (res.result) {
          alert('Data saved successfully');
          this.getGridData();
        }
        else {
          alert(res.message);
        }
        console.log(res);
      })
  }
  onUpdate() {
    console.log("Update Request Data:", this.form.value);

    this.masterServ.updatePropertyTye(this.form.value).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert('Record Updated successfully');
        this.getGridData(); // Refresh the grid data after update
      } else {
        alert(res.message); // Show error message if update fails
      }
      console.log(res); // Log the response for debugging
    });
  }

  onDelete(id: number) {
    //console.log("Deleting Property ID:", id);
    const isDelete = confirm('Are you sure want to Delete')
    if (isDelete) {
      this.masterServ.deletePropertyTypeById(id).subscribe((res: IAPIResponseModel) => {
        if (res.result) {
          alert('Record Deleted successfully');
          this.getGridData(); // Refresh the grid data after update
        }
        else {
          alert(res.message); // Show error message if update fails
        }
        console.log(res); // Log the response for debugging
      })
    }
  }

  onEdit(item: IpropertyType) {
    console.log("Editing Item:", item);
    this.initializeForm(item);
  }
  
  initializeForm(item?: IpropertyType) {
    console.log("Received item in initializeForm", item);
    this.form = new FormGroup({
      propertTypeId: new FormControl<number>(item ? item.propertTypeId : 0),
      propertyType: new FormControl<string>(item ? item.propertyType : '', [Validators.required, Validators.minLength(3)]),
    });

    console.log("Form Initialized:", this.form.value);
  }

}


