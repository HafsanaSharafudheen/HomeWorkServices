import Provider from '../../Entities/serviceProvider'

const saveUser = async (providerData: any): Promise<any> => {
  const provider = new Provider(providerData);
  return provider.save();
};

export default { saveUser };
