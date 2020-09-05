import React, { Component } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faDollarSign,
  faCogs,
  faSmile,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import CardView from "react-native-cardview";
import { SaveJson } from "./SaveJson";

export default class QuestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questCompletion: 0,
    };
  }
  addCompletion = () => {
    this.state.questCompletion += 10;
    console.log(this.state.questCompletion);
  };
  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.navBar}>
          <FontAwesomeIcon icon={faHome} size={30} color={"grey"} />
          <FontAwesomeIcon icon={faDollarSign} size={30} color={"grey"} />
          <FontAwesomeIcon icon={faCogs} size={30} color={"grey"} />
        </View>

        <View style={styles.Content}>
          <View style={styles.QuestButtons}>
            <Button
              title="Daily Quest"
              onPress={() => console.log("hello Daily Quest")}
            />
            <Button
              title="Weekly Quest"
              onPress={() => console.log("Weekly Quest")}
            />
            <Button
              title="Group Quest"
              onPress={() => console.log("Group Quest")}
            />
          </View>

          <CardView style={styles.taskCard} cornerRadius={5}>
            <View style={styles.taskDiv}>
              <Text style={styles.taskTitle}>Get up at 8 am</Text>
              <Text style={styles.rewardPoint}>
                + 5
                <FontAwesomeIcon icon={faSmile} size={21} color={"orange"} />
              </Text>
            </View>
            <Text style={styles.taskbody}>Quest 1 to do</Text>
            <Button
              style={styles.taskToDo}
              title="Complete"
              onPress={() => console.log("Complete 1st request")}
            />
          </CardView>

          <CardView style={styles.taskCard} cornerRadius={5}>
            <View style={styles.taskDiv}>
              <Text style={styles.taskTitle}>Walk 1000 meters</Text>
              <Text style={styles.rewardPoint}>
                + 5
                <FontAwesomeIcon icon={faLeaf} size={21} color={"green"} />
              </Text>
            </View>
            <Text style={styles.taskbody}>Quest 2 to do</Text>
            <Button
              style={styles.taskToDo}
              title="Complete"
              onPress={() =>
                Alert.alert(
                  "Task complete?",
                  "Confirm and get rewards",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("click cancel"),
                      // onPress: () => SaveJson.testJson("hello world"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => this.addCompletion(),
                    },
                  ],
                  { cancelable: false }
                )
              }

              // console.log("Complete 2nd request")}
            />
          </CardView>

          <CardView style={styles.taskCard} cornerRadius={5}>
            <View style={styles.taskDiv}>
              <Text style={styles.taskTitle}>Eat an apple a day</Text>
              <Text style={styles.rewardPoint}>
                + 3
                <FontAwesomeIcon icon={faLeaf} size={21} color={"green"} />
              </Text>
            </View>
            <Text style={styles.taskbody}>Quest completed</Text>
            <Button style={styles.taskDone} title="Done" />
          </CardView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    flexDirection: "column",
  },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  taskCard: {
    flex: 5,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
    justifyContent: "center",
  },

  taskDiv: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  taskTitle: {
    fontSize: 20,
  },

  rewardPoint: {
    fontSize: 20,
    color: "darkblue",
  },

  taskbody: {
    flex: 1,
    fontSize: 14,
  },

  taskDone: {
    borderColor: "#737373",
    backgroundColor: "darkgrey",
  },

  Content: {
    flex: 10,
    backgroundColor: "#fff",
    marginTop: "15%",
  },

  // QuestButtons: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   alignItems: "baseline",
  // },

  // QuestDetails: {
  //   backgroundColor: "#fff",
  //   justifyContent: "flex-start",
  //   flex: 10,
  // },
  // QuestCompletion: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "flex-start",
  // },
  // TextStyle: {
  //   backgroundColor: "#fff",
  //   justifyContent: "center",
  // },
  // ImageStyle: {
  //   backgroundColor: "#fff",
  //   width: "100%",
  //   height: "100%",
  // },
  // SeparatorLine: {
  //   backgroundColor: "#fff",
  //   width: 1,
  //   height: 40,
  // },
});
