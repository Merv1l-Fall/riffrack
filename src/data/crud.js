import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./database.js";
import { data } from "react-router";

const PRODUCTS_COLLECTION = "products"

async function getProducts() {
	try {
		const productsCollection = collection(db, PRODUCTS_COLLECTION);
		const productSnapshot = await getDocs(productsCollection);
		const productsList = productSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		console.log("Fetched products:", productsList);
		return productsList;
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error;
	}
}

async function addProduct(newItemData) {
	try{
		const productsCollection = collection(db, PRODUCTS_COLLECTION);

		const newItemRef = await addDoc(productsCollection, newItemData);
		console.log("added item with id", newItemRef.id)
		return newItemRef;
	} catch(error){
		console.error("failed to add item", error);
		throw error;
	}
}

async function updateProduct(productObject) {
	const productId = productObject.id;
	if (!productId) {
		console.error("Product ID is required for updating.");
		throw new Error("Product ID is required for updating.");
	}

	const itemRef = doc(db, PRODUCTS_COLLECTION, productId);
	const {id, price, ...dataWithoutIdandPrice} = productObject;
	const dataToUpdate = {
		price: parseFloat(String(price)),
		...dataWithoutIdandPrice,
	};
	
		try {
		await updateDoc(itemRef, dataToUpdate);
		console.log("Document successfully updated!", productId);
		// return "Document successfully updated!", itemId;
	} catch (error) {
		console.error("Error updating document: ", error);
		throw error;
	}
}

async function removeProduct(productId) {
	if (!productId) {
		console.error("Product ID is required for deletion.");
		throw new Error("Product ID is required for deletion.");
	}

	const itemRef = doc(db, PRODUCTS_COLLECTION, productId);
	try {
		await deleteDoc(itemRef);
		console.log("Document successfully deleted!", productId);
	} catch (error) {
		console.error("Error deleting document: ", error);
		throw error;
	}
}

export { getProducts, addProduct, removeProduct, updateProduct };