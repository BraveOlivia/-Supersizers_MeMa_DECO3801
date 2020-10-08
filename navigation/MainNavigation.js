import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  HomeScreen,
  QuestScreen,
  NutritionalScreen,
  ShopScreen,
  ChatScreen,
} from "../components/ScreenComponents";
import { ImageBackground, StyleSheet } from "react-native";
import Chat from "../components/ChatScreen";

const Stack = createStackNavigator();

export default class MainNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Quest" component={QuestScreen} />
          <Stack.Screen name="Nutritional" component={NutritionalScreen} />
          <Stack.Screen name="Shop" component={ShopScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

// export default TabNavigator(
//   {
//     Home: { screen: HomeScreen },
//     Quest: { screen: QuestScreen },
//     NutritionalTips: { screen: NutritionalScreen },
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused }) => {
//         const { routeName } = navigation.state;
//         let iconName;
//         switch (routeName) {
//           case "Home":
//             iconName =
//               Platform.OS === "ios"
//                 ? `ios-information-circle${focused ? "" : "-outline"}`
//                 : "md-information-circle";
//             break;
//         }
//         return (
//           <Ionicons
//             name={iconName}
//             size={28}
//             style={{ marginBottom: -3 }}
//             color={focused ? Design.tabIconSelected : Design.tabIconDefault}
//           />
//         );
//       },
//     }),
//     tabBarComponent: TabBarBottom,
//     tabBarPosition: "bottom",
//     animationEnabled: false,
//     swipeEnabled: false,
//   }
// );
