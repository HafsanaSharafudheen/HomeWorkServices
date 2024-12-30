import { Request, Response } from "express";
import { findAllBookingsData } from '../../../application/businesslogics/provider';

export const fetchBookingsDataforProvider = async (req: Request, res: Response): Promise<void> => {
    const providerId  = req.query.providerId;

    if (!providerId) {
        res.status(400).json({ message: "Provider ID is required." });
        return;
    }

    try {
        const bookings = await findAllBookingsData(providerId as string);
        res.status(200).json({ bookings });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Failed to fetch bookings." });
    }
};

export default fetchBookingsDataforProvider;
