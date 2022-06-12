import firebaseConfig from './firebaseConfig'
import { initializeApp } from 'firebase/app';

const InitializeAuthentication = () => {
    initializeApp(firebaseConfig)
}

export default InitializeAuthentication;