import { updateUserBlockStatus } from '../../../application/businesslogics/admin';

const blockUser = async (req: any, res: any) => {
  try {
    const user = await updateUserBlockStatus(req.params.id, true);
    res.status(200).json({ message: "User blocked successfully", user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const unblockUser = async (req: any, res: any) => {
  try {
    const user = await updateUserBlockStatus(req.params.id, false);
    res.status(200).json({ message: "User unblocked successfully", user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default { blockUser, unblockUser };
