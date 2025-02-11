export interface UserEntity {
  fullName: string;
  email: string;
  phone?: string;
  whatsappNumber?: string;
  address?: { city: string; district: string; pin: string };
  password: string;
  contactNumber?: string;
  serviceCategory?: string;
  serviceCharge?: number;
  yearsOfExperience?: number;
  workingHours?: { start: string; end: string };
  certifications?: string;
  languages?: string[];
  
  education?: {
    institute: string;
    year: number;
  };
}
