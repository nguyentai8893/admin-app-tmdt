// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBt_qI8NtRFxzAA7WwGvQXDmQBExs1y1JE',
	authDomain: 'image-web-tmdt.firebaseapp.com',
	projectId: 'image-web-tmdt',
	storageBucket: 'image-web-tmdt.appspot.com',
	messagingSenderId: '324009153209',
	appId: '1:324009153209:web:e32b31636235428a3fc168',
	measurementId: 'G-FPPJ2MQ33W',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
