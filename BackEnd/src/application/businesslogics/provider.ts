import Provider from '../../infrastructure/dbModels/serviceProvider';

const findProviderById = async (id: string): Promise<any> => {
  const provider = await Provider.findOne({ _id: id });
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

const updateProviderServiceCharges = async (
  userId: string,
  charges: any
): Promise<any> => {
  const provider = await Provider.findById(userId);

  if (!provider) {
    throw new Error("No service provider found");
  }

  provider.serviceCharges = charges;
  await provider.save();

  return provider;
};

// Exporting all functions together
export default {
  findProviderById,
  updateProviderProfile,
  updateProviderServiceCharges,
};
