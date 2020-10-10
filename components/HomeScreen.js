// Homescreen.js

import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  View,
  Button,
  Alert,
} from "react-native";
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
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import * as firebase from "firebase";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarStatus: 0,
      avatarHealth: 0,
    };
    // firebase
    //   .database()
    //   .ref("response/avatarHealth")
    //   .once("value", (dataSnapShot) => {
    //     this.setState({ avatarHealth: dataSnapShot.val() });
    //   });
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    () => this.readData();
  }

  //Occurs when signout is pressed;
  signOutPress = () => {
    firebase.auth().signOut();
  };

  handleAvatarHealthChange = (props) => {
    const avatarHealth = props.health;
    if (avatarHealth > 80) {
      return (
        <Image
          style={styles.avatar}
          source={require("../assets/avatar/avatar_1.png")}
        />
      );
    } else if (avatarHealth > 60 && avatarHealth <= 80) {
      return (
        <Image
          style={styles.avatar}
          source={require("../assets/avatar/avatar_2.png")}
        />
      );
    } else if (avatarHealth > 40 && avatarHealth <= 60) {
      return (
        <Image
          style={styles.avatar}
          source={require("../assets/avatar/avatar_3.png")}
        />
      );
    } else if (avatarHealth > 20 && avatarHealth <= 40) {
      return (
        <Image
          style={styles.avatar}
          source={require("../assets/avatar/avatar_4.png")}
        />
      );
    } else {
      return (
        <Image
          style={styles.avatar}
          source={require("../assets/avatar/avatar_5.png")}
        />
      );
    }
  };

  // _retrieveData = async () => {
  //   try {
  //     const health = await AsyncStorage.getItem("avatarHealth");
  //     if (health !== null) {
  //       console.log(health);
  //       return health;
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  readData() {
    firebase
      .database()
      .ref("response/avatarHealth")
      .once("value", (dataSnapShot) => {
        var tempHealth = dataSnapShot.val();
        this.setState({ avatarHealth: tempHealth });
      });
  }

  writeData() {
    firebase.database().ref("response/").update({
      avatarHealth: this.state.avatarHealth,
    });
  }

  componentDidMount() {
    this.timerID1 = setInterval(() => this.readData(), 1000);
    this.timerID1 = setInterval(() => this.reduceHealth(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID1);
  }

  reduceHealth() {
    this.setState((state) => {
      if (state.avatarHealth > 0) {
        return { avatarHealth: state.avatarHealth - 1 };
      } else {
        return { avatarHealth: 0 };
      }
    });
    this.writeData();
    // console.log("reducing health");
  }

  render() {
    // console.log(this.state.avatarHealth);
    // var health = 0;
    // if (!firebase.apps.length) {
    //   firebase.initializeApp(ApiKeys.FirebaseConfig);
    // }
    // firebase
    //   .database()
    //   .ref("response/avatarHealth")
    //   .once("value", (dataSnapShot) => {
    //     console.log(dataSnapShot.val());
    //     health = dataSnapShot.val();
    //   });
    // var intervalID = setInterval(() => {
    //   this.health -= 5;
    // }, 1000);
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/BackgroundOrange.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.navBar}>
            <FontAwesomeIcon icon={faHome} size={30} color={"black"} />
            <FontAwesomeIcon icon={faDollarSign} size={30} color={"black"} />
            <FontAwesomeIcon icon={faCogs} size={30} color={"black"} />
            <FontAwesomeIcon
              icon={faSignOutAlt}
              size={30}
              color={"black"}
              onPress={this.signOutPress}
            />
          </View>

          <View style={styles.avatarContainer}>
            <Text style={styles.avatarDialogue}>
              [AvatarName]: G'day[UserName], staying healthy?
            </Text>
            <this.handleAvatarHealthChange health={this.state.avatarHealth} />
            {/* <Image
            style={styles.avatar}
            source={require("../assets/avatar/avatar_2.png")}
          /> */}
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
              <FontAwesomeIcon icon={faCheckSquare} size={30} color={"black"} />
              <FontAwesomeIcon icon={faLightbulb} size={30} color={"black"} />
              <FontAwesomeIcon icon={faShoppingBag} size={30} color={"black"} />
              <FontAwesomeIcon icon={faUserFriends} size={30} color={"black"} />
            </View>

            <View style={styles.menurow}>
              <Button
                title="Quests"
                onPress={() => this.props.navigation.navigate("Quest")}
              />

              <Button
                title="Nutrition"
                onPress={() => this.props.navigation.navigate("Nutritional")}
              />
              <Button
                title="Shop"
                onPress={() => this.props.navigation.navigate("Shop")}
              />
              <Button
                title="Friends"
                onPress={() => this.props.navigation.navigate("Chat")}
              />
            </View>
          </View>
        </ImageBackground>
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

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
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
    padding: 2,
    marginBottom: "10%",
  },

  menurow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  avatar: {
    width: "75%",
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
