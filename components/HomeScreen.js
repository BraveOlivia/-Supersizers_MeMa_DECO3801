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
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  createAppContainer,
} from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ProgressBar, Colors } from "react-native-paper";
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
import { fb, Fire } from "../src/firebase/APIKeys";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarStatus: 0,
      avatarHealth: 0,
      backgroundColor: 0,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    () => this.readData();
  }

  get user() {
    return {
      //   name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
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

  readData() {
    fb.database()
      .ref("response/" + this.user._id + "/avatarHealth")
      .once("value", (dataSnapShot) => {
        var tempHealth = dataSnapShot.val();
        this.setState({ avatarHealth: tempHealth });
      });
    fb.database()
      .ref("response/" + this.user._id + "/avatarStatus")
      .once("value", (dataSnapShot) => {
        var tempStatus = dataSnapShot.val();
        this.setState({ avatarStatus: tempStatus });
      });
    // firebase
    //   .database()
    //   .ref("response/character")
    //   .once("value", (querySnapShot) => {
    //     var data = querySnapShot.val();
    //     this.setState({
    //       avatarCharacter: data,
    //     });
    //   });
    // console.log("1 .state of character is: " + this.state.avatarCharacter);
    // console.log("2 .state of health is: " + this.state.avatarHealth);
    // firebase
    //   .database()
    //   .ref("response/backgroundColor")
    //   .once("value", (dataSnapShot) => {
    //     var tempColor = dataSnapShot.val();
    //     this.setState({ backgroundColor: tempColor });
    //   });
  }

  writeData() {
    firebase.database().ref("response/" + this.user._uid + "/").update({
      avatarHealth: this.state.avatarHealth,
    });
  }

  componentDidMount() {
    this.timerID1 = setInterval(() => this.readData(), 1000);
    this.timerID1 = setInterval(() => this.reduceHealth(), 50000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID1);
  }

  reduceHealth() {
    this.setState((state) => {
      return { avatarHealth: state.avatarHealth - 1 };
    });
    this.writeData();
    // console.log("reducing health");
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/BackgroundOrange.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.navBar}>
            <FontAwesomeIcon icon={faHome} size={40} color={"black"} />
            <FontAwesomeIcon icon={faDollarSign} size={40} color={"black"} />
            <FontAwesomeIcon icon={faCogs} size={40} color={"black"} />
            <FontAwesomeIcon
              icon={faSignOutAlt}
              size={40}
              color={"black"}
              onPress={this.signOutPress}
            />
          </View>

          <View style={styles.avatarContainer}>
            <Text style={styles.avatarDialogue}>
              [AvatarName]: G'day[UserName], staying healthy?
            </Text>
            <this.handleAvatarHealthChange health={this.state.avatarHealth} />
            <View>
              <Text style={styles.textStyle}> Happiness Status </Text>
              <ProgressBar
                progress={1 * this.state.avatarStatus * 0.01}
                color={Colors.lightBlue300}
                style={{
                  width: 200,
                  height: 13,
                }}
              />
            </View>
            <Text> </Text>
            <View>
              <Text style={styles.textStyle}> Emotion Status </Text>
              <ProgressBar
                progress={1 * this.state.avatarHealth * 0.01}
                color={Colors.white}
                style={{
                  width: 200,
                  height: 13,
                }}
              />
            </View>
          </View>

          <View style={styles.footMenu}>
            {/* <View style={styles.menurow}>
              <FontAwesomeIcon icon={faCheckSquare} size={30} color={"black"} />
              <FontAwesomeIcon icon={faLightbulb} size={30} color={"black"} />
              <FontAwesomeIcon icon={faShoppingBag} size={30} color={"black"} />
              <FontAwesomeIcon icon={faUserFriends} size={30} color={"black"} />
            </View> */}

            <View style={styles.MainButtons}>
              <TouchableOpacity
                style={styles.customBtnBG}
                onPress={() => this.props.navigation.navigate("Quest")}
              >
                <Text style={styles.customBtnText}>Quest</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.customBtnBG}
                onPress={() => this.props.navigation.navigate("Nutritional")}
              >
                <Text style={styles.customBtnText}>Nutrition</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.customBtnBG}
                onPress={() => this.props.navigation.navigate("Shop")}
              >
                <Text style={styles.customBtnText}>Shop</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.customBtnBG}
                onPress={() => this.props.navigation.navigate("Chat")}
              >
                <Text style={styles.customBtnText}>Socialize</Text>
              </TouchableOpacity>
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
    marginTop: 10,
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
    padding: 5,
    marginBottom: "10%",
  },

  menurow: {
    marginBottom: 30,
    borderRadius: 100,
    borderColor: "white",
  },

  avatar: {
    width: 220,
    height: 220,
    margin: 40,
  },

  avatarDialogue: {
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    color: "#000000",
    borderWidth: 0.5,
    borderRadius: 10,
    width: 250,
    padding: 10,
    marginTop: "10%",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: "400",
  },

  MainButtons: {
    alignItems: "center",
    alignContent: "center",
  },

  customBtnText: {
    fontSize: 24,
    fontWeight: "300",
    color: "#990000",
    textAlign: "center",
  },
  customBtnBG: {
    backgroundColor: "#FFE5CC",
    borderRadius: 5,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 5,
    width: 150,
    height: 30,
    flexDirection: "column",
  },

  customBtnBG: {
    backgroundColor: "#FFE5CC",
    borderRadius: 5,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 5,
    width: 150,
    height: 30,
    flexDirection: "column",
  },

  textStyle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#990000",
    textAlign: "left",
  },
});
