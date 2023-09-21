import { defineStore } from 'pinia';

interface State {
  email: string;
  email_verified: boolean;
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => <State>{
    email: '',
    email_verified: false,
  },
  actions: {
    init(
      email: string | undefined,
      email_verified: boolean | undefined,
    ) {
      if (email) this.email = email;
      if (typeof email_verified === 'boolean')
        this.email_verified = email_verified;
    },
  },
});