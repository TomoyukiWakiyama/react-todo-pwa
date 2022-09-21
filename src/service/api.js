import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const initGet = async (uid) => {
  let todos = [];
  const q = query(
    collection(db, "todo"),
    orderBy("createdAt", "desc"),
    where("uid", "==", uid)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(
    // "🚀 ~ file: api.js ~ line 21 ~ querySnapshot.forEach ~ doc",
    // doc.data().content
    // );

    todos.push({
      id: doc.id,
      content: doc.data().content,
      isComplete: doc.data().isComplete,
    });
  });
  return todos;
};

export const addTodo = async (content, uid) => {
  const createTodo = await addDoc(collection(db, "todo"), {
    uid: uid,
    content: content,
    isComplete: false,
    createdAt: serverTimestamp(),
  });
};

export const deleteTodo = async (uid) => {
  const dataRef = doc(db, "todo", uid);
  await deleteDoc(dataRef);
};

export const updateComplete = async (uid) => {
  // const todo = await collection(db, "todo", uid);
  const docRef = doc(db, "todo", uid);
  const docSnap = await getDoc(docRef);
  //   console.log(
  //     "🚀 ~ file: api.js ~ line 58 ~ updateComplete ~ docSnap",
  //     docSnap.data().isComplete
  //   );
  return await updateDoc(docRef, {
    isComplete: !docSnap.data().isComplete,
  });
};
