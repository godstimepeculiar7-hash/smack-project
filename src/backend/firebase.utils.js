// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import riceProducts from '../My Products/Products'
import swallow from "../My Products/Swallow";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiMb-lLSAIiVuYRWswrYbliW2BfmGQrj0",
  authDomain: "smack-2dd68.firebaseapp.com",
  projectId: "smack-2dd68",
  storageBucket: "smack-2dd68.firebasestorage.app",
  messagingSenderId: "1066311101220",
  appId: "1:1066311101220:web:4a2fc3f90c2ec7374461b1",
  measurementId: "G-80QCQK0S77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export async function saveUserToDataBase(user, additionalData = {}) {
  if (!user) return;
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    return;
  }

  await setDoc(
    userRef,
    {
      email: user.email,
      name: additionalData.fullName || user.displayName || '',
      phoneNumber: additionalData.phone || user.phoneNumber || null,
      createdAt: new Date()
    }
  );
}


export async function uploadProducts() {
  try {
    const productsRef = collection(db, 'Rice');
    const snapShot = getDocs(productsRef)

    if (!(await snapShot).empty) {
      alert('Products already exists. Skipping upload');
      return;
    }

    for (const product of riceProducts) {
      await addDoc(productsRef, product);
    }

    alert('All products uploaded successfully!');
  } catch (error) {
    console.error("Error uploading products: ", error);
  }
}

export async function getProducts() {
  try {
    const productsRef = collection(db, 'Rice');
    const snapshot = await getDocs(productsRef);

    const products = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
}

export async function uploadSwallow() {
  try {
    const productsRef = collection(db, 'Swallow');
    const snapShot = getDocs(productsRef);

    if (!(await snapShot).empty) {
      alert('Swallow already exists. Skipping upload');
      return;
    }

    for (const product of swallow) {
      await addDoc(productsRef, product)
    }

    alert('Swallow uploaded successfully');
  } catch (error) {
    console.error('error uploading Swallow', error);
  }
}

export async function getSwallow() {
  try {
    const productsRef = collection(db, 'Swallow');
    const snapShot = await getDocs(productsRef);

    const products = snapShot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    return products;
  } catch (error) {
    console.error('error fetching swallow', error);
    return [];
  }
}