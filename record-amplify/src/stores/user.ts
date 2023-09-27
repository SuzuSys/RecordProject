import { defineStore } from 'pinia';

interface State {
  username: string;
  email: string;
  email_verified: boolean;
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => <State>{
    username: '',
    email: '',
    email_verified: false,
  },
  actions: {
    init(
      username: string | undefined,
      email: string | undefined,
      email_verified: boolean | undefined,
    ) {
      if (username) this.username = username;
      if (email) this.email = email;
      if (typeof email_verified === 'boolean')
        this.email_verified = email_verified;
    },
  },
});