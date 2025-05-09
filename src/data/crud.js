import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./database.js";

async function getProducts(setProducts) {
	const productsCollection = collection(db, "products");
	const productsSnapshot = await getDocs(productsCollection);
	const productslist = productsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
	setProducts(productslist);
	console.log("get Products", productslist)
}

async function addProduct(newItem, setProducts) {
	try{
		const productsCollection = collection(db, "products");

		const itemObject = {
			title: newItem.title,
			description: newItem.description,
			category: newItem.category,
			img: newItem.img,
			price: newItem.price,
			id: newItem.id
		}
		const newItemRef = await addDoc(productsCollection, itemObject)

		console.log("added item with title", newItemRef.title)
		getProducts(setProducts)
		return newItemRef;

	} catch{
		console.error("failed to add item", error);
		throw error;
	}
}

export { getProducts, addProduct };