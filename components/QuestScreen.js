import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { fb } from "../src/firebase/APIKeys";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import ApiKeys from "../src/firebase/APIKeys";
import * as firebase from "firebase";

var questData = {};
var baseHealth = 0;

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.FirebaseConfig);
}
readData();

function readData() {
  firebase
    .database()
    .ref("response/quests")
    .once("value", (dataSnapShot) => {
      questData = dataSnapShot.val();
    });
  firebase
    .database()
    .ref("response/avatarHealth")
    .once("value", (dataSnapShot) => {
      baseHealth = dataSnapShot.val();
    });
}

function completeQuest(rewardHealth) {
  firebase
    .database()
    .ref("response/")
    .update({
      avatarHealth: baseHealth + rewardHealth,
    })
    .then(() => {
      console.log("Completed a quest");
    })
    .catch((error) => {
      console.log(error);
    });
}

function ReadAllTab() {
  const [questData, allQuests] = useState([]);
  useEffect(() => {
    const questRef = fb.database().ref("/response/quests");
    const OnLoadingListener = questRef.on("value", (snapshot) => {
      allQuests([]);
      snapshot.forEach(function (childSnapshot) {
        // console.log(childSnapshot.val());
        allQuests((questData) => [...questData, childSnapshot.val()]);
      });
    });
    return () => {
      questRef.off("value", OnLoadingListener);
    };
  }, []);
  return (
    <View>
      {questData.map(function (item) {
        return (
          <TouchableOpacity
            key={item["questID"]}
            style={styles.textContainer}
            onPress={() =>
              Alert.alert(
                "Task Complete?",
                "Confirm and get rewards:  \nHealth: " +
                  // item["questReward"]["avatarHealth"] +
                  // "\nHappiness: " +
                  // item["questReward"]["avatarStatus"],
                  item.questReward.avatarHealth +
                  "\nHappiness: " +
                  item.questReward.avatarStatus,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("click cancel"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => completeQuest(item.questReward.avatarHealth),
                    //onPress: () => console.log("congratulations"),
                  },
                ],
                { cancelable: false }
              )
            }
          >
            <View style={styles.taskDiv}>
              <Text style={styles.taskTitle}> {item["questName"]}</Text>
              <Text style={styles.rewardPoint}>
                + {item["questReward"]["avatarHealth"]}
                <Icon name={"md-heart"} color={"red"} size={20} />
              </Text>
            </View>
            <Text> {item["questDescription"]}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
ReadAllTab.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon name={focused ? "ios-cube" : "md-cube"} color={tintColor} size={25} />
  ),
};

function InProgreeTab() {
  const [inProgress, allInProgressQuests] = useState([]);

  useEffect(() => {
    const questRef = fb.database().ref("/response/quests");
    const OnLoadingListener = questRef.on("value", (snapshot) => {
      allInProgressQuests([]);
      snapshot.forEach(function (childSnapshot) {
        if (
          childSnapshot.val()["questProgress"]["questCompletion"] != 0 &&
          childSnapshot.val()["questProgress"]["questCompletion"] !=
            childSnapshot.val()["questProgress"]["questMaxValue"]
        ) {
          allInProgressQuests((inProgress) => [
            ...inProgress,
            childSnapshot.val(),
          ]);
        }
      });
    });
    return () => {
      questRef.off("value", OnLoadingListener);
    };
  }, []);
  return (
    <View>
      {inProgress.map(function (item) {
        {
          return (
            <TouchableOpacity
              key={item["questID"]}
              style={styles.textContainer}
              onPress={() =>
                Alert.alert(
                  "Your Progress",
                  "You have finished " +
                    item["questReward"]["avatarHealth"] +
                    "/" +
                    item["questReward"]["avatarStatus"] +
                    " of the task, good job and go on",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("click cancel"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () =>
                        completeQuest(item.questReward.avatarHealth),
                      //onPress: () => console.log("congratulations"),
                    },
                  ],
                  { cancelable: false }
                )
              }
            >
              <View style={styles.taskDiv}>
                <Text style={styles.taskTitle}> {item["questName"]}</Text>
                <Text style={styles.rewardPoint}>
                  + {item["questReward"]["avatarHealth"]}
                  <Icon name={"md-heart"} color={"red"} size={20} />
                </Text>
              </View>
              <Text> {item["questDescription"]}</Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}
InProgreeTab.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon
      name={focused ? "ios-stats" : "ios-stats"}
      color={tintColor}
      size={25}
    />
  ),
};

function CompletionTab() {
  const [completedQuest, allCompletedQuests] = useState([]);

  useEffect(() => {
    const questRef = fb.database().ref("/response/quests");
    const OnLoadingListener = questRef.on("value", (snapshot) => {
      allCompletedQuests([]);
      snapshot.forEach(function (childSnapshot) {
        // console.log(childSnapshot.val());
        if (
          childSnapshot.val()["questProgress"]["questCompletion"] ==
          childSnapshot.val()["questProgress"]["questMaxValue"]
        ) {
          allCompletedQuests((completedQuest) => [
            ...completedQuest,
            childSnapshot.val(),
          ]);
        }
      });
    });
    return () => {
      questRef.off("value", OnLoadingListener);
    };
  }, []);
  return (
    <View>
      {completedQuest.map(function (item) {
        {
          return (
            <TouchableOpacity
              key={item["questID"]}
              style={styles.textContainer}
            >
              <View style={styles.taskDiv}>
                <Text style={styles.taskTitle}> {item["questName"]}</Text>
                <Text style={styles.rewardPoint}>
                  + {item["questReward"]["avatarHealth"]}
                  <Icon name={"md-checkmark"} color={"green"} size={20} />
                </Text>
              </View>
              <Text> {item["questDescription"]}</Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}
CompletionTab.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon
      name={focused ? "ios-flag" : "ios-flag"}
      color={tintColor}
      size={25}
    />
  ),
};

const Tab = createMaterialTopTabNavigator(
  {
    All: ReadAllTab,
    Inprogress: InProgreeTab,
    Completed: CompletionTab,
  },
  {
    tabBarOptions: {
      activeTintColor: "white",
      showIcon: true,
      showLabel: true,
      style: {
        backgroundColor: "#5F7EB2",
      },
    },
  }
);
const AppIndex = createAppContainer(Tab);

export default class QuestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questCompletion: 0,
      avatarStatus: 0,
      avatarHealth: 0,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  render() {
    readData();
    return (
      <View style={styles.MainContainer}>
        <AppIndex />

        {/* <View style={styles.Content}> */}
        {/* <View style={styles.QuestButtons}>
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
          </View> */}

        {/* <CardView style={styles.taskCard} cornerRadius={5}>
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
          </CardView> */}

        {/* <CardView style={styles.taskCard} cornerRadius={5}>
            <View style={styles.taskDiv}>
              <Text style={styles.taskTitle}>Eat an apple a day</Text>
              <Text style={styles.rewardPoint}>
                + 3
                <FontAwesomeIcon icon={faLeaf} size={21} color={"green"} />
              </Text>
            </View>
            <Text style={styles.taskbody}>Quest completed</Text>
            <Button style={styles.taskDone} title="Done" />
          </CardView> */}
        {/* </View> */}
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
    // flex: 1,
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

  textContainer: {
    padding: 10,
    marginTop: 3,
    backgroundColor: "white",
    borderColor: "darkgrey",
    borderWidth: 1,
  },
});
