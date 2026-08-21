/**
 * item.repo.js — Repository für die Collection "shoppingList".
 *
 * Idee (Folie Repository): alle Firestore-Funktionen für EINE Collection
 * liegen in EINER Datei. Die UI ruft nur createItem / findMyItems / …
 *
 * CRUD:
 * C createItem  — addDoc
 * R findMyItems — getDocs + where (nur eigene uid)
 * U updateItem  — updateDoc (Feld bought)
 * D deleteItem  — deleteDoc
 */

/*
item.repo.js folgt dem Repository Pattern — einer Konvention, bei der alle Datenzugriffs-Funktionen einer Entität 
(hier: 'items') in einer Datei gesammelt werden. Das .repo im Namen ist nur eine Konvention, 
um das visuell klarzumachen, keine feste Regel von JavaScript.*/

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./config";

// Referenz auf die Collection (Ordner). Dokumente = einzelne Items.
const itemCollection = collection(db, "shoppingList");

// CREATE — neues Dokument. Firestore vergibt die ID automatisch.
// uid = Besitzer (von gestern: Auth). bought = noch nicht gekauft.
export function createItem(name, uid) {
  return addDoc(itemCollection, { name, uid, bought: false });
}

// READ — Snapshot (Foto) der Query, nicht der ganzen Collection.
// where filtert die ANZEIGE. Echte Sicherheit = Security Rules (Server).
export async function findMyItems(uid) {
  const q = query(itemCollection, where("uid", "==", uid));
  const snapshot = await getDocs(q);

  // d.id liegt NICHT in data() — deshalb extra dazu mergen
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// UPDATE — nur das Feld bought ändern (name + uid bleiben)
export function updateItem(id, bought) {
  return updateDoc(doc(db, "shoppingList", id), { bought });
}

// DELETE — Dokument weg. Kein Papierkorb.
export function deleteItem(id) {
  return deleteDoc(doc(db, "shoppingList", id));
}

/*
async/await ist nur nötig, wenn der Code auf das Ergebnis warten muss, 
um innerhalb derselben Funktion etwas damit zu tun — zum Beispiel Daten umwandeln (findMyItems),
 oder danach noch weitere Logik ausführen. Wenn die Funktion die Promise nur weiterreicht 
 (createItem, updateItem, deleteItem), braucht man kein async/await — das Ergebnis ist dasselbe, nur mit weniger Code
*/
