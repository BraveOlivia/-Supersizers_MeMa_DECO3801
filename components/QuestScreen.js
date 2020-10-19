import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { fb, Fire } from "../src/firebase/APIKeys.js";

var baseHealth = 0;
var baseStatus = 0;
var baseCurrency = 0;
var userid = Fire.shared.user._id;
console.log("questScreen userID " + userid);

()=> readData();

function readData() {
  fb.database()
    .ref("response/"+ userid +"/avatarHealth")
    .once("value", (dataSnapShot) => {
      baseHealth = dataSnapShot.val();
    });
  fb.database()
    .ref("response/" + userid + "/avatarStatus")
    .once("value", (dataSnapShot) => {
      baseStatus = dataSnapShot.val();
    });
  fb.database()
    .ref("response/" + userid + "/currency")
    .once("value", (dataSnapShot) => {
      baseCurrency = dataSnapShot.val();
    });
}

function completeQuest(rewardHealth) {
  baseHealth += rewardHealth["avatarHealth"];
  baseStatus += rewardHealth["avatarStatus"];
  baseCurrency += rewardHealth["shopCurrency"];
  if (baseHealth >= 100) {
    fb
      .database()
      .ref("response/" + userid + "/")
      .update({
        avatarHealth: 100,
        avatarStatus: baseStatus,
        currency: baseCurrency,
      })
      .then(() => {
        console.log("Completed a quest");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    fb
      .database()
      .ref("response/" + userid + "/")
      .update({
        avatarHealth: baseHealth,
        avatarStatus: baseStatus,
        currency: baseCurrency,
      })
      .then(() => {
        console.log("Completed a quest");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// Updating Quest after a quest has been completed.
const updating = (id, progress) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (id != null) {
      key = id;
    } else {
      key = fb.database().ref().push().key;
    }
    let complete = {
      questCompletion: progress["questMaxValue"],
      questMaxValue: progress["questMaxValue"],
    };
    let dataToSave = {
      questID: key,
      questProgress: complete,
    };
    console.log(dataToSave);
    fb.database()
      .ref("/response/" + userid + "/quests/" + key)
      .update(dataToSave)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

function ReadAllTab() {
  const [quests, allQuests] = useState([]);
  useEffect(() => {
    const questRef = fb.database().ref("/response/"+ userid +"/quests/");
    const OnLoadingListener = questRef.on("value", (snapshot) => {
      allQuests([]);
      snapshot.forEach(function (childSnapshot) {
        allQuests((quests) => [...quests, childSnapshot.val()]);
      });
    });
    return () => {
      questRef.off("value", OnLoadingListener);
    };
  }, []);
  return (
    <View>
      {quests.map(function (item) {
        return (
          <TouchableOpacity
            key={item["questID"]}
            style={styles.textContainer}
            onPress={() =>
              Alert.alert(
                "Task Complete?",
                "Confirm and get rewards:  \nHealth: " +
                  item["questReward"]["avatarHealth"] +
                  "\nHappiness: " +
                  item["questReward"]["avatarStatus"],
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("click cancel"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => completeQuest(item["questReward"]),
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
    const questRef = fb.database().ref("/response/"+ userid +"/quests/");
    const OnLoadingListener = questRef.on("value", (snapshot) => {
      allInProgressQuests([]);
      snapshot.forEach(function (childSnapshot) {
        
            allInProgressQuests((inProgress) => [
              ...inProgress,
              childSnapshot.val(),
            ]);
          // }
      });
    });
    return () => {
      questRef.off("value", OnLoadingListener);
    };
  }, []);
  return (
    <View>
      {inProgress.map(function (item) {
          if (item["questProgress"]["questCompletion"] >= 0 &&
            item["questProgress"]["questCompletion"] != item["questProgress"]["questMaxValue"]) 
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
                          onPress: () => {
                            completeQuest(item["questReward"]);
                            updating(item["questID"], item["questProgress"]);
                          },
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
    const questRef = fb.database().ref("/response/" + userid + "/quests/");
    const OnLoadingListener = questRef.on("value", (snapshot) => {
      allCompletedQuests([]);
      snapshot.forEach(function (childSnapshot) {
          allCompletedQuests((completedQuest) => [
            ...completedQuest,
            childSnapshot.val(),
          ]);
        // }
      });
    });
    return () => {
      questRef.off("value", OnLoadingListener);
    };
  }, []);
  return (
    <View>
      {completedQuest.map(function (item) {
        if (item["questProgress"]["questCompletion"] == item["questProgress"]["questMaxValue"])
          {
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
      activeTintColor: "black",
      showIcon: true,
      showLabel: true,
      style: {
        borderColor: "black",
        backgroundColor: "#FF6600",
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
      avatarCurrency: 0,
    };
    if (!fb.apps.length) {
      fb.initializeApp(ApiKeys.FirebaseConfig);
    }
    readData();
  }

  componentDidMount() {
    this.timerID1 = setInterval(() => readData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID1);
  }

  render() {
    readData();
    return (
      <View style={styles.MainContainer}>
        <ImageBackground
          source={require("../assets/BackgroundOrange.png")}
          style={styles.backgroundImage}
        >
          <AppIndex />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
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
