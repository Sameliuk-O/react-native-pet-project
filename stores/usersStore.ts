import {makeAutoObservable} from 'mobx';
import {UserInterface} from '../interfaces/UserInterface';

class UsersStore {
  users: UserInterface[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  registerUser(user: UserInterface) {
    this.users.push({...user, userId: this.users.length});
  }
}

const usersStore = new UsersStore();
export default usersStore;
