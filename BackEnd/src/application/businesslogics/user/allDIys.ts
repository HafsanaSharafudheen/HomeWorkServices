import diy from "../../../infrastructure/dbModels/diy";

export const allDiys = async () => {
  try {
    
    const diys = await diy.aggregate([
      {
        $lookup: {
          from: "providers",
          let: { providerId: { $toObjectId: "$providerId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$providerId"] } } }
          ],
          as: "providerDetails", 
        },
      },
      {
        $unwind: '$providerDetails',
      },
    ]);
    return diys;
  } catch (error) {
    console.error('Error fetching DIYs:', error);
    throw new Error('Failed to fetch DIYs.');
  }
};

