import { StatusBar } from "expo-status-bar";
import React from "react";
import Home from "./app/screens/Home";
import { StyleSheet, Text, Image, View, Button, Alert } from "react-native";

export default function App() {
  console.log("App Executed");
  console.log("This is a test branch - Dicky");
  return <Home />;
}
