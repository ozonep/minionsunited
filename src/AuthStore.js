import { observable, action } from 'mobx';
import auth from './firebase';

// export default class AuthStore {
//     @observable authUser = null;
//
//     constructor(rootStore) {
//         auth.onAuthStateChanged(user => this.authUser = user)
//     }
//
//     @action setAuthUser = authUser => {
//         this.authUser = authUser;
//     }
// }
