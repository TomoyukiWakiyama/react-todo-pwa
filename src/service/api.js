import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
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
