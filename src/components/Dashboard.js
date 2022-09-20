import React, { useContext, useEffect, useState } from "react";
import dig from "object-dig";
import { AuthContext } from "../providers/AuthProvider";
import { Box, Button, Input } from "@chakra-ui/react";
import { signInWithGoogle } from "../service/firebase";
import { addTodo, initGet } from "../service/api";
const Dashboard = () => {
  const currentUser = useContext(AuthContext);
  const uid = dig(currentUser, "currentUser", "uid");
  const [inputName, setInputName] = useState("");
  const [todos, setTodos] = useState([]);
  console.log("🚀 ~ file: Dashboard.js ~ line 12 ~ Dashboard ~ todos", todos);
  useEffect(() => {
    // 一覧を取得
    fetch();
  }, [currentUser]);
  const fetch = async () => {
    if (!dig(currentUser, "currentUser", "uid")) return;
    const data = await initGet(uid);
    setTodos(data);
  };
  const post = () => {
    addTodo(inputName, uid);
    setInputName("");
  };
  return (
    <>
      {dig(currentUser, "currentUser", "uid") ? (
        <Box>
          <form>
            <Input
              onChange={(e) => setInputName(e.target.value)}
              value={inputName}
            />
            <Button type="button" onClick={() => post()}>
              AddTodo
            </Button>
          </form>
        </Box>
      ) : (
        <Button onClick={signInWithGoogle}>LogIn</Button>
      )}
    </>
  );
};

export default Dashboard;
