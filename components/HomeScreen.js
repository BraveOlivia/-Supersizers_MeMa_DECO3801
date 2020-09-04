// Homescreen.js

import React, { Component } from "react";
import { StyleSheet, Text, Image, View, Button, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  createAppContainer,
} from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faDollarSign,
  faCogs,
  faCheckSquare,
  faLightbulb,
  faShoppingBag,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

export default class Homescreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <FontAwesomeIcon icon={faHome} size={30} color={"grey"} />
          <FontAwesomeIcon icon={faDollarSign} size={30} color={"grey"} />
          <FontAwesomeIcon icon={faCogs} size={30} color={"grey"} />
        </View>

        <View style={styles.avatarContainer}>
          <Text style={styles.avatarDialogue}>
            [AvatarName]: G'day[UserName], staying healthy?
          </Text>
          <Image
            style={styles.avatar}
            source={require("../assets/avatar.png")}
          />
          <View style={styles.emotionStatus}>
            <Text>[Happiness Bar]</Text>
          </View>
          <View style={styles.healthStatus}>
            <Text>[Status Bar]</Text>
          </View>
          {/* <Button
          color="fuchsia"
          title="Feed Avatar"
          onPress={() => Alert.alert("Avatar:", "Thank you!")}
        /> */}
        </View>

        <View style={styles.footMenu}>
          <View style={styles.menurow}>
            <FontAwesomeIcon icon={faCheckSquare} size={30} color={"grey"} />
            <FontAwesomeIcon icon={faLightbulb} size={30} color={"grey"} />
            <FontAwesomeIcon icon={faShoppingBag} size={30} color={"grey"} />
            <FontAwesomeIcon icon={faUserFriends} size={30} color={"grey"} />
          </View>

          <View style={styles.menurow}>
            <Button
              title="Quests"
              onPress={() => this.props.navigation.navigate("Quest")}
            />

            <Button
              title="Nurtrition"
              onPress={() => this.props.navigation.navigate("Nutritional")}
            />

            <Button
              title="Shop"
              onPress={() => console.log("Items Button Pressed")}
            />

            <Button
              title="Friends"
              onPress={() => console.log("Socialise Button Pressed")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f8ff",
    flex: 1,
    flexDirection: "column",
  },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  avatarContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  footMenu: {
    flex: 0.1,
    alignItems: "stretch",
    justifyContent: "space-evenly",
    flexDirection: "column",
    margin: 30,
    padding: 1,
    marginBottom: "10%",
  },

  menurow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  avatar: {
    width: "50%",
    height: "50%",
    margin: 50,
  },

  avatarDialogue: {
    alignItems: "center",
    backgroundColor: "#dcdcdc",
    borderWidth: 0.5,
    borderRadius: 5,
    width: 250,
    padding: 10,
    marginTop: "20%",
    justifyContent: "center",
  },

  emotionStatus: {
    flex: 1.2,
    width: 250,
    backgroundColor: "lightgreen",
    justifyContent: "center",
  },

  healthStatus: {
    margin: 5,
    flex: 1.2,
    width: 250,
    backgroundColor: "orange",
    justifyContent: "center",
  },
});
