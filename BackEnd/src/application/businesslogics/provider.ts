import Provider, { IProvider } from '../../infrastructure/dbModels/serviceProvider';

const findProviderById = async (id: string): Promise<IProvider> => {
  const provider = await Provider.findOne({ _id: id });
  console.log("provider from the finproviderby id", provider);
  if (!provider) {
    throw new Error("No service provider found");
  }
  return provider;
};

const updateProviderProfile = async (
  userId: string,
  updateData: Record<string, any>
): Promise<any> => {
  const result = await Provider.updateOne({ _id: userId }, { $set: updateData });

  if (!result || result.modifiedCount === 0) {
    throw new Error("No service provider found or no changes made");
  }

  return result;
};



const findAllProvidersByCategory = async ( serviceCategory: string ): Promise<any> => {
  const providers = await Provider.find({
    serviceCategory: { $regex: new RegExp(serviceCategory, "i") }
  });
  if (providers.length === 0) {
    throw new Error("No service provider found");
  }
  return providers;
};

export const updateProviderAvailable = async (
  userId: string,
  isAvailable: boolean
): Promise<any> => {
  try {
    const provider = await Provider.findById(userId);

    if (!provider) {
      throw new Error("No service provider found");
    }

    const result = await Provider.updateOne(
      { _id: userId },
      { $set: { isAvailable: isAvailable } }
    );

    if (!result || result.modifiedCount === 0) {
      throw new Error("Failed to update availability status");
    }

    return result;
  } catch (error) {
    console.error("Error updating availability:", error);
    throw error;
  }
};

// Exporting all functions together
export default {
  findProviderById,
  updateProviderProfile,
  findAllProvidersByCategory,updateProviderAvailable
};
