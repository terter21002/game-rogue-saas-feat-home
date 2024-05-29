import { TOrganization } from '@repo/types';
import { create } from 'zustand';

interface OrganizationStore {
  currentOrganization: TOrganization | undefined;
  setCurrentOrganization: (organization: TOrganization | undefined) => void;
}

export const useOrganization = create<OrganizationStore>((set) => ({
  currentOrganization: undefined,
  setCurrentOrganization(organization) {
    set({ currentOrganization: organization });
  },
}));
