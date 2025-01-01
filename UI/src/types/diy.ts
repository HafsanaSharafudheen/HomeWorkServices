
  
  export interface DIY {
    _id: string;
    ditTitle: string;
    purpose: string;
    materialsRequired: string[];
    steps:{
        title: string;
        description: string;
      } [];
    category: string;
    safetyTips: string[];
    additionalNotes: string;
    photos: string[];
    vedios: string[];
    providerId:string
  };