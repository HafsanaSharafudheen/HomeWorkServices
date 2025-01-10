import User from '../../infrastructure/dbModels/user'
import Provider from '../../infrastructure/dbModels/serviceProvider'

   export const updateProfilePicture =async(entityType: 'user' | 'provider', entityId: string, filePath: string)=> {
    let updatedEntity;

    if (entityType === 'user') {
      updatedEntity = await User.findByIdAndUpdate(
        entityId,
        { profilePicture: filePath },
        { new: true }
      );
    } else if (entityType === 'provider') {
      updatedEntity = await Provider.findByIdAndUpdate(
        entityId,
        { profilePicture: filePath },
        { new: true }
      );
    }

    return updatedEntity;
  }

