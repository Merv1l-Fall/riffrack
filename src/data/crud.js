import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./database.js";

async function getProducts(setProducts) {
	const productsCollection = collection(db, "products");
	const productsSnapshot = await getDocs(productsCollection);
	const productslist = productsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
	setProducts(productslist);
	console.log("get Products", productslist)
}

export { getProducts };