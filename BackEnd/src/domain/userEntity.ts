export interface UserEntity{
    fullName: string;
    email: string;
    phone?: string;
    address?: string;
    password: string;
    contactNumber?: string;
    serviceCategory?: string;
    yearsOfExperience?: number;
    workingHours?: string;
    certifications?: string;
    languages?: string[];
    education?: {
      institute: string;
      year: number;
    };
  }