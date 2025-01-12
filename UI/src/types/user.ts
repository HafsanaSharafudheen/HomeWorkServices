 export interface User {
    _id?: string;
    fullName: string;
    email: string;
    phone: string;
    image?: string; 
    password:string;
    whatsappNumber:string;
    address:{district:string,city:string,pin?:number|string}
    createdAt?: string;
    confirmPassword: string;
    profilePicture?:string
    isBlocked?: boolean;
    isAdmin?: boolean;
  }
  