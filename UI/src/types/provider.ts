export interface Provider {
  fullName: string; 
  email: string;
  password: string; 
  confirmPassword: string;
  contactNumber: string; 
  whatsappNumber: string; 
  serviceCategory: string;
  yearsOfExperience: number; 
  workingHours:{start:string,end:string}
  certifications: string; 
  languages: string[]; 
  education: {
    institute: string;
    year: number; 
  };
  serviceCharge: number; 
  address: {
    city: string;
    district: string;
    pin: string;
  };
  isAdmin?: boolean; 
  isAvailable?: boolean; 
}
