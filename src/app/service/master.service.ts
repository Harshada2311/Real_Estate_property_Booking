import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAPIResponseModel, IpropertyType, Site } from '../models/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {


  constructor(private http: HttpClient) {

  }
  getAllPropertyType(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyType');
  }
  savePropertyTye(obj: IpropertyType): Observable<IAPIResponseModel> {
    const newobh = [obj]
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddPropertyType', newobh);
  }
  updatePropertyTye(obj: IpropertyType): Observable<IAPIResponseModel> {

    return this.http.put<IAPIResponseModel>(environment.API_URL + 'UpdatePropertyType', obj);
  }
  deletePropertyTypeById(id: number): Observable<IAPIResponseModel> {
    return this.http.delete<IAPIResponseModel>(environment.API_URL + 'DeletePropertyTypeById?id=' + id)
  }
  saveSite(obj: Site): Observable<IAPIResponseModel> {
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddSites', obj)
  }

  getAllSites(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllSites')
  }

  updateSites(obj: Site): Observable<IAPIResponseModel> {
    return this.http.put<IAPIResponseModel>(environment.API_URL + 'UpdateSites', obj)
  }

  deleteSitesTypeById(id: number): Observable<IAPIResponseModel> {
    return this.http.delete<IAPIResponseModel>(environment.API_URL + 'DeleteSitesById?id=' + id)
  }
  saveProperty(obj: Site): Observable<IAPIResponseModel> {
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddPropertyMasters', obj)
  }
  getAllPropertyMasters(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyMasters')
  }
  updatePropertyMasters(obj: Site): Observable<IAPIResponseModel> {
    return this.http.put<IAPIResponseModel>(environment.API_URL + 'UpdatePropertyMasters', obj)
  }
  deletePropertyMasterById(id: number): Observable<IAPIResponseModel> {
    return this.http.delete<IAPIResponseModel>(environment.API_URL + 'DeletePropertyMasterById?propertyId=' + id)
  }
  getAllPropertyBySiteId(siteid: number): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyBySiteId?siteid=' + siteid)
  }

  onSaveBooking(obj: Site): Observable<IAPIResponseModel> {
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddPropertyBooking', obj)
  }
  getAllPropertyBooking(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyBooking')
  }
 
  getAllPropertyBookingBySiteId(siteid: number): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyBookingBySiteId?siteid=' + siteid)
  }
  getBookingByBookingId(bookingid: number): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetBookingByBookingId?bookingId=' + bookingid)
  }

}
