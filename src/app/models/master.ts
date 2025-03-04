export interface IpropertyType {
  propertTypeId: number; // Change this to match the API response
  propertyType: string;
}

export interface IAPIResponseModel {
  propertTypeId: number;
  message: string;
  data: any;
  result: boolean;
}
export interface IProperty {
  propertyId: number
  propertyNo: number
  facing: string
  totalArea: string
  rate: number
  siteId: number
}
export interface Ibooking {
  bookingId: number
  propertyId: number
  bookindDate: Date
  bookingRate: number
  totalAmont: number
  custId: number
  name: string
  mobile: string
  emailid: string
  address: string
}

export class Site {
  siteId: number;
  siteTitle: string;
  location: string;
  propertyTypeId: string;
  city: string;
  pincode: string;
  state: string;
  totalProperties: string;
  createdDate: Date;
  lastUpdatedDate: Date;

  constructor() {
    this.siteId = 0;
    this.siteTitle = '';
    this.location = '';
    this.propertyTypeId = '';
    this.city = '';
    this.pincode = '';
    this.state = '';
    this.totalProperties = '';
    this.createdDate = new Date();
    this.lastUpdatedDate = new Date();
  }
}
