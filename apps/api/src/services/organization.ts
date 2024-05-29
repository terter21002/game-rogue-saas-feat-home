import organizationModel from '../models/organization';

export const getUserOwnedOrganizations = async (userId: string) => {
  const organizations = await organizationModel.find({ userId });
  return organizations;
};
