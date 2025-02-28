import { Component, ElementRef, inject, OnInit, signal , ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAPIResponseModel, IProperty, IpropertyType, Site } from '../../models/master';
import { map, Observable, pipe } from 'rxjs';
import { MasterService } from '../../service/master.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-site',
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe, CommonModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit {

  isFormView = signal<boolean>(false);
  formObj: Site = new Site();
  masterSrv = inject(MasterService)
  gridData: Site[] = []
  propertyList: IProperty[] =[]
  @ViewChild('propertyModel') modal: ElementRef | undefined;
   currentSiteId: number = 0;
   propertyForm: FormGroup = new FormGroup({});


  propertyTypes: Observable<IpropertyType[]> = new Observable<IpropertyType[]>

  constructor() {
    this.propertyTypes = this.masterSrv.getAllPropertyType().pipe(
      map((item: IAPIResponseModel) => {
        console.log("Property Types API Response:", item); // Debugging
        return item.data
      })
    );
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getGirdData()
  }
  initializeForm() {
    this.propertyForm = new FormGroup({
      propertyId: new FormControl(0),
      propertyNo: new FormControl('', Validators.required),
      facing: new FormControl('', Validators.required),
      totalArea: new FormControl('', Validators.required),
      rate: new FormControl('', Validators.required),
      siteId: new FormControl(this.currentSiteId),
      
      
  })}

  getGirdData() {
    this.masterSrv.getAllSites().subscribe((res: IAPIResponseModel) => {
      console.log("API Response:", res); // Log the API response for debugging
      this.gridData = res.data; // Assign the data to gridData
    })
  }
  getProperties() {
    this.masterSrv.getAllPropertyMasters().subscribe((res: IAPIResponseModel) => {
      console.log("API Response:", res); // Log the API response for debugging
      this.propertyList = res.data.filter((m:any)=>m.siteId == this.currentSiteId); // Assign the data to gridData
    })
  }
  openModel(data: Site){
    this.currentSiteId = data.siteId;
    this.initializeForm();
    this.getProperties();
    if(this.modal){
      this.modal.nativeElement.style.display = 'block';
    }
    
  }
  closeModel(){
    if(this.modal){
      this.modal.nativeElement.style.display = 'none';
    }
    
  }

  toggleView() {
    this.isFormView.set(!this.isFormView());
  }
  
  onSaveProperty(){
    this.masterSrv.saveProperty(this.propertyForm.value).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert("Record Saved")
        this.getProperties()
        

      }
      else {
        alert(res.message)
      }
    })

  }
  onEditProperty(item: IProperty){
    this.propertyForm.patchValue(item)
  }
  onUpdateProperty(){
    this.masterSrv.updatePropertyMasters(this.propertyForm.value).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert("Record Saved")
        this.getProperties()
    
      }
      else {
        alert(res.message)
      }
    })
  }
  onDeleteProperty(id:number){
    const isDelte = confirm("Are you sure you want to delete this record?")
    if (isDelte)
      this.masterSrv.deletePropertyMasterById(id).subscribe((res: IAPIResponseModel) => {
        {
          if (res.result) {
            alert("Record Deleted")
            this.getProperties()
          }
          else {
            alert(res.message)
          }
        }
      })

  }

  onSave() {
    this.masterSrv.saveSite(this.formObj).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert("Record Saved")
        this.getGirdData()
        this.toggleView()

      }
      else {
        alert(res.message)
      }
    })
  }
  onEdit(data: Site) {
    this.formObj = data;
    this.toggleView()
  }
  onUpdate() {
    this.masterSrv.updateSites(this.formObj).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert("Record Saved")
        this.getGirdData()
        this.toggleView()

      }
      else {
        alert(res.message)
      }
    })
  }
  onDelete(id: number) {
    const isDelte = confirm("Are you sure you want to delete this record?")
    if (isDelte)
      this.masterSrv.deleteSitesTypeById(id).subscribe((res: IAPIResponseModel) => {

        {
          if (res.result) {
            alert("Record Deleted")
            this.getGirdData()
          }
          else {
            alert(res.message)
          }

        }

      })
  }

  
}
