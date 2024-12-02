import Provider from '../../infrastructure/dbModels/serviceProvider'

const saveUser = async (providerData: any): Promise<any> => {
  const provider = new Provider(providerData);
  return provider.save();
};

export default { saveUser };