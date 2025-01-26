import { Review } from "./review";

export interface Provider {
  endTime: string;
  startTime: string;
  _id ?:string;
  fullName: string; 
  email: string;
  averageRating?:number;
  totalReviews?:number;
  password: string; 
  reviews:Review[];
  isBlocked?: boolean;

  confirmPassword: string;
  contactNumber: string; 
  whatsappNumber: string; 
  serviceCategory?: string;
  yearsOfExperience?: number; 
  workingHours?:{start:string,end:string}
  certifications?: string; 
  languages?: string[]; 
  education?: {
    institute: string;
    year: number; 
  };
  serviceCharge?: number; 
  address?: {
    city: string;
    district: string;
    pin: string;
  };
  isAdmin?: boolean; 
  isAvailable?: boolean; 
  profilePicture?:string
  accountNumber?:string,
    IFSCCode?:string

}
