import { Box } from "@chakra-ui/react";
import React from "react";
import AuthProvider from "./providers/AuthProvider";
import Header from "./components/Header";
import "./service/firebase";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Dashboard />
      </AuthProvider>
    </>
  );
}

export default App;
