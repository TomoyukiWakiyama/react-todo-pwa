import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import React from "react";

const TodoList = ({ todos }) => {
  const todoList = todos.map((todo) => {
    return (
      <ListItem key={todo.id}>
        <Text>{todo.content}</Text>
      </ListItem>
    );
  });

  return (
    <Box>
      <Heading>Your Task</Heading>
      <List>{todoList}</List>
    </Box>
  );
};

export default TodoList;
