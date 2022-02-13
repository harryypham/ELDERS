import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "../firebase";
export const createUserDocument = async (user, firstname, lastname, dob) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            name: firstname + " " + lastname,
            dob: dob
        })
    }
}
export const createGoogleUserDocument = async (user) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            name: user.displayName
        })
    }
}
