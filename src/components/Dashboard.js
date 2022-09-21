import React, { useContext, useEffect, useState } from "react";
import dig from "object-dig";
import { AuthContext } from "../providers/AuthProvider";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { signInWithGoogle } from "../service/firebase";
import { addTodo, initGet } from "../service/api";
import TodoList from "./TodoList";
const Dashboard = () => {
  const currentUser = useContext(AuthContext);
  const uid = dig(currentUser, "currentUser", "uid");
  const [inputName, setInputName] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    // 一覧を取得
    fetch();
  }, [currentUser]);
  const fetch = async () => {
    if (!dig(currentUser, "currentUser", "uid")) return;
    const data = await initGet(uid);
    setTodos(data);
  };
  const post = async () => {
    await addTodo(inputName, uid);
    await setInputName("");
    fetch();
  };

  const formRender = () => {
    let dom = null;
    if (dig(currentUser, "currentUser", "uid"))
      dom = (
        <Box>
          <Box>
            <form>
              <Flex>
                <Input
                  onChange={(e) => setInputName(e.target.value)}
                  value={inputName}
                />
                <Button type="button" onClick={() => post()}>
                  AddTodo
                </Button>
              </Flex>
            </form>
          </Box>
          <TodoList todos={todos} fetch={fetch} />
        </Box>
      );
    else dom = <Button onClick={signInWithGoogle}>LogIn</Button>;
    return dom;
  };
  return <>{formRender()}</>;
};

export default Dashboard;
