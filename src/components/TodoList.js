import React from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { deleteTodo, updateComplete } from "../service/api";
import { DeleteIcon } from "@chakra-ui/icons";

const TodoList = ({ todos, fetch }) => {
  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetch();
  };
  const handleUpdateComplete = async (id) => {
    await updateComplete(id);
    fetch();
  };
  const todoList = todos.map((todo) => {
    return (
      <ListItem
        key={todo.id}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex>
          <Checkbox
            isChecked={todo.isComplete}
            onChange={() => handleUpdateComplete(todo.id)}
          />
          <Text ml={2}>{todo.content}</Text>
        </Flex>
        <Button
          colorScheme="red"
          variant="ghost"
          onClick={() => handleDelete(todo.id)}
        >
          <DeleteIcon />
        </Button>
      </ListItem>
    );
  });

  return (
    <Box>
      <Heading mt={8} textAlign="center" fontSize="xl">
        Your Task
      </Heading>
      <List mt={8}>
        <VStack spacint={4} align="stretch">
          {todoList}
        </VStack>
      </List>
    </Box>
  );
};

export default TodoList;
