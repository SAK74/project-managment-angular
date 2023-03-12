export interface StoreType {
  token: {
    token: string;
    isLogged: boolean;
  };
  user: {
    login: string;
    id: string;
  };
}
