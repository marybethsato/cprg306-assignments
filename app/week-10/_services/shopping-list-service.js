import { addDoc, collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { db } from '../_utils/firebase';

export async function getItems(userId) {
    const items = [];
    const q = query(
        collection(db, "users", userId, "items")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        data['id'] = doc.id;
        items.push(data);
    });
    return items;
}

export async function addItem(userId, item) {
    console.log(item);
    const docRef = await addDoc(collection(db, "users", userId, "items"), item);
    console.log("Item is created with ID: ", docRef.id);
    return docRef.id;

}

export async function deleteItem(userId, itemId) {
    const docRef = doc(db, "users", userId, "items", itemId);
    await deleteDoc(docRef);
}

export default getItems;
