import { LangType } from 'src/languages';
import { UserType } from '../services/request.service';

export interface StoreType {
  token: {
    token: string;
    isLogged: boolean;
  };
  user: UserType;
  lang: LangType;
}
