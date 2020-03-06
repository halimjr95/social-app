import React from "react";
import { Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackground
} from "@react-navigation/stack";

import Login from "../src/screens/Login";
import Register from "../src/screens/Register";

export default function Route() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#00b5ec"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
