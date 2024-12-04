export interface Provider {
  fullName: string; 
  email: string;
  password: string; 
  confirmPassword: string;
  contactNumber: string; 
  serviceCategory: string;
  yearsOfExperience: number; 
  workingHours: string; 
  certifications: string; 
  languages: string[]; 
  education: {
    institute: string;
    year: number; 
  };
  serviceCharge: number;
  isAdmin?: boolean; // Optional
  isAvailable?: boolean; // Optional
}
