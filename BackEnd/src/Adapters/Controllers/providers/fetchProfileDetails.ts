import { Request, Response } from 'express';
import Provider from '../../../Entities/serviceProvider';

const fetchProfileDetails = async (req: any, res: any): Promise<void> => {
  try {
    console.log(req.user,"request from fetchprofile details")
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User not authenticated or invalid user ID' });
    }

    const userId = req.user.id; 
    console.log(req.user,"requestUser")
    const profile = await Provider.findOne({ _id: userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error('Error fetching profile details:', error);
    res.status(500).json({ message: 'Error fetching profile details' });
  }
};

export default fetchProfileDetails;
