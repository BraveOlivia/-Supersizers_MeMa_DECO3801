import React from "react";
import Home from "./app/screens/Home";
import { StyleSheet, Text, Image, View, Button, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen";
import QuestScreen from "./components/QuestScreen";
import NutritionalScreen from "./components/NutritionalScreen";

const Stack = createStackNavigator();
console.log("hello world - this is another test DSG");
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Supersizers" }}
        />
        <Stack.Screen name="Quest" component={QuestScreen} />
        <Stack.Screen name="Nutritional" component={NutritionalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
