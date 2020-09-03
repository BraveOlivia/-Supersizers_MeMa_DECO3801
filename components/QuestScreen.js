import React, { Component, useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

export default class QuestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.Header}>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              source={require("../assets/home.png")}
              style={styles.ImageStyle}
            />
            {/* <Text style={styles.TextStyle}>Home</Text> */}
            <Button
              style={{ justifyContent: "center" }}
              title="Home"
              onPress={() => this.props.navigation.navigate("Home")}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              source={require("../assets/help.png")}
              style={styles.ImageStyle}
            />
            <Button
              style={{ alignItems: "stretch" }}
              title="Help"
              onPress={() => console.log("help")}
            />
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
            // style={{ right: 20 }}
            activeOpacity={0.5}
          >
            <Image
              source={require("../assets/money-bag.png")}
              style={styles.ImageStyle}
            />
            <Button
              style={{ alignItems: "stretch" }}
              title="Rewards Point"
              onPress={() => console.log("Your rewards is ", this.state.count)}
            />
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
                <Button
                  title="In Progress"
                  onPress={() => console.log("Quest in progress")}
                />
              </View>
              <View style={styles.QuestInComplete}>
                <Button
                  title="Complete"
                  onPress={() => console.log("Quest incompleted")}
                />
              </View>
              <View style={styles.QuestComplete}>
                <Button
                  title="Incomplete"
                  onPress={() => console.log("Quest completed")}
                />
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
    flex: 0.8,
    flexDirection: "row",
    // top: "5%",
    left: 10,
    bottom: 100,
    // flexWrap: "wrap",
  },
  QuestButtons: {
    flex: 2.3,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "stretch",
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
    backgroundColor: "white",
    width: 35,
    height: 35,
    //margin: 5,
    marginBottom: 4,
    marginRight: 20,
  },
  SeparatorLine: {
    backgroundColor: "#fff",
    width: 1,
    height: 40,
  },
});
