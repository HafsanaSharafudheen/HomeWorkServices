export interface Review  {
    userId:string;
      providerId:string;
    ratings: number;
    message: string;
    workImage?: string; 
    workVideo?: string; 
    createdAt?: Date;
    updatedAt?: Date;
  }