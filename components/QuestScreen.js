import React, { Component } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default class QuestScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.Header}>
          <TouchableOpacity
            style={{ backgroundColor: "dodgerblue", width: 50, height: 50 }}
            activeOpacity={0.5}
          >
            <Image
              source={require("../app/assets/home.png")}
              style={styles.ImageStyle}
            />
            <Text style={styles.TextStyle}>Home</Text>
            {/* <Button
                    title="Home"
                    onPress={() => this.props.navigation.navigate("Home")}
                /> */}
          </TouchableOpacity>

          <View style={styles.TextStyle}>
            <Text
              style={{
                fontSize: 32,
              }}
            >
              Quest Page
            </Text>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: "dodgerblue", right: 20 }}
            activeOpacity={0.5}
          >
            <Image
              styles={styles.ImageStyle}
              source={require("../app/assets/money-bag.png")}
            />
            <Text style={styles.TextStyle}>Reward Points</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Content}>
          <View style={styles.QuestButtons}>
            <Button
              title="Daily Quest"
              onPress={() => console.log("Daily Quest")}
            />
            <Button
              title="Weekly Quest"
              onPress={() => console.log("Weekly Quest")}
            />
            <Button
              title="Group Quest"
              onPress={() => console.log("Group Quest")}
            />
            <Button
              title="Challenge Quest"
              onPress={() => console.log("Challenge Quest")}
            />
          </View>
          <View style={styles.QuestDetails}>
            <View style={styles.QuestCompletion}>
              <View style={styles.QuestInProgress}>
                <Button title="In Progress" />
              </View>
              <View style={styles.QuestInComplete}>
                <Button title="Complete" />
              </View>
              <View style={styles.QuestComplete}>
                <Button title="Incomplete" />
              </View>
            </View>
            <View style={styles.QuestTask}></View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "flex-start",
  },
  Header: {
    flex: 1,
    left: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  Content: {
    flex: 1,
    flexDirection: "row",
    // top: "5%",
    left: 10,
    bottom: 100,
    // flexWrap: "wrap",
  },
  QuestButtons: {
    flex: 1.5,
    justifyContent: "space-around",
    alignItems: "baseline",
  },
  QuestDetails: {
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flex: 10,
  },
  QuestCompletion: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  TextStyle: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  ImageStyle: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    // marginBottom: 4,
    // marginRight: 20,
  },
  SeparatorLine: {
    backgroundColor: "#fff",
    width: 1,
    height: 40,
  },
});

// <Button
// styles={{ position: "absolute" }}
// title="Go back"
// onPress={() => this.props.navigation.goBack()}
// />
