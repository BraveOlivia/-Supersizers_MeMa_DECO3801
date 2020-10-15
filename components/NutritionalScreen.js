//NutritionScreen.js

import Icon from "react-native-vector-icons/Ionicons";
import React, { Component, useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { fb, Fire } from "../src/firebase/APIKeys";

var baseHealth = 0;
var baseStatus = 0;
var baseCurrency = 0;
readData();

function readData() {
  fb.database()
    .ref("response/avatarHealth")
    .once("value", (dataSnapShot) => {
      baseHealth = dataSnapShot.val();
    });
  fb.database()
    .ref("response/avatarStatus")
    .once("value", (dataSnapShot) => {
      baseStatus = dataSnapShot.val();
    });
  fb.database()
    .ref("response/currency")
    .once("value", (dataSnapShot) => {
      baseCurrency = dataSnapShot.val();
    });
}

function ReadTab() {
  const [read, allReads] = useState([]);
  useEffect(() => {
    const readRef = fb.database().ref("/response/nutritionalTips");
    const OnLoadingListener = readRef.on("value", (snapshot) => {
      allReads([]);
      snapshot.forEach(function (childSnapshot) {
        allReads((read) => [...read, childSnapshot.val()]);
      });
    });
    // const childRemovedListener = readRef.on("child_removed", (snapshot) => {
    //   // Set Your Functioanlity Whatever you want.
    //   alert("Child Removed");
    // });

    // const childChangedListener = readRef.on("child_changed", (snapshot) => {
    //   // Set Your Functioanlity Whatever you want.
    //   alert("Child Updated/Changed");
    // });

    return () => {
      readRef.off("value", OnLoadingListener);
      // readRef.off("child_removed", childRemovedListener);
      // readRef.off("child_changed", childChangedListener);
    };
  }, []);
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          {read.map(function (item, index) {
            if (item["complete"]) {
              return (
                <TouchableOpacity
                  key={item["tipID"]}
                  style={styles.textContainer}
                  // onPress={() => reading(item, index)}
                >
                  <Text style={styles.text}>Type: {item["tipType"]}</Text>
                  <Text style={styles.text}>Title: {item["tipName"]}</Text>
                  <Text style={styles.text}>Description: {item["tip"]}</Text>
                  <Text style={styles.text}>
                    Rewards: {item["tipReward"]["shopCurrency"]}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
ReadTab.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon
      name={focused ? "ios-mail-open" : "md-mail-open"}
      color={tintColor}
      size={25}
    />
  ),
};

// Update tip after the tip has been read
const submitTip = (index, id, name, tip, type, reward, complete) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (id != null) {
      key = id;
    } else {
      key = fb.database().ref().push().key;
    }
    let dataToSave = {
      tipID: key,
      tipName: name,
      complete: complete,
      tipReward: reward,
      tip: tip,
      tipType: type,
    };
    console.log(dataToSave);
    fb.database()
      .ref("/response/nutritionalTips/" + index)
      .update(dataToSave)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

function completeTips(rewardHealth) {
  baseHealth += rewardHealth["avatarHealth"];
  baseStatus += rewardHealth["avatarStatus"];
  baseCurrency += rewardHealth["shopCurrency"];
  this.setState((state, props) => ({
    baseHealth: state.baseHealth + rewardHealth["avatarHealth"],
    baseCurr: state.baseCurr + rewardHealth["shopCurrency"],
    baseStatus: state.baseStatus + rewardHealth["avatarStatus"],
  }));
  fb.database()
    .ref("response/")
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

// Reading Alert to verify if the tip is read.
function reading(item, index) {
  Alert.alert(
    item["tipName"],
    item["tip"],
    [
      {
        text: "Cancel",
        onPress: () => console.log("cancel"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          console.log("hey!!!");
          console.log(this.state.baseCurr);
          completeTips(item["tipReward"]);
          
          console.log("sup!!!");
          console.log(this.state.baseCurr);
          submitTip(
            index,
            item["tipID"],
            item["tipName"],
            item["tip"],
            item["tipType"],
            item["tipReward"],
            !item["complete"]
          );
        },
      },
    ],
    { cancelable: false }
  );
}
function UnreadTab() {
  const [unread, allUnreads] = useState([]);

  useEffect(() => {
    const unreadRef = fb.database().ref("/response/nutritionalTips");
    const OnLoadingListener = unreadRef.on("value", (snapshot) => {
      allUnreads([]);
      snapshot.forEach(function (childSnapshot) {
        // console.log(childSnapshot.val());
        allUnreads((unread) => [...unread, childSnapshot.val()]);
      });
    });

    return () => {
      unreadRef.off("value", OnLoadingListener);
    };
  }, []);
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          {unread.map(function (item, index) {
            if (!item["complete"]) {
              return (
                <TouchableOpacity
                  key={item["tipID"]}
                  style={styles.textContainer}
                  onPress={() => reading(item, index)}
                >
                  <Text style={styles.text}>Type: {item["tipType"]}</Text>
                  <Text style={styles.text}>Title: {item["tipName"]}</Text>
                  <Text style={styles.text}>Description: {item["tip"]}</Text>
                  <Text style={styles.text}>
                    Rewards: {item["tipReward"]["shopCurrency"]}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
UnreadTab.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon
      name={focused ? "ios-mail-unread" : "md-mail-unread"}
      color={tintColor}
      size={25}
    />
  ),
};

const Tab = createMaterialTopTabNavigator(
  {
    Unread: UnreadTab,
    Read: ReadTab,
  },
  {
    tabBarOptions: {
      activeTintColor: "black",
      showIcon: true,
      showLabel: true,
      style: {
        backgroundColor: "#FF9933",
      },
    },
  }
);
const AppIndex = createAppContainer(Tab);

export default class NutritionalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseHealth: 0,
      baseStatus: 0,
      baseCurr: 0,
    };
    if (!fb.apps.length) {
      fb.initializeApp(ApiKeys.FirebaseConfig);
    }
    completeTips = completeTips.bind(this);
    reading = reading.bind(this);
  }

  readData() {
    fb.database()
      .ref("response/avatarHealth")
      .once("value", (dataSnapShot) => {
        var temp = dataSnapShot.val();
        this.setState({ baseHealth: temp });
      });
    fb.database()
      .ref("response/avatarStatus")
      .once("value", (dataSnapShot) => {
        var temp = dataSnapShot.val();
        this.setState({ baseStatus: temp });
      });
    fb.database()
      .ref("response/currency")
      .once("value", (dataSnapShot) => {
        var temp = dataSnapShot.val();
        this.setState({ baseCurr: temp });
      });
  }

  handleCurrency = () => {
    // this.readData();
    return (
      <Text style={{ fontSize: 25, color: "white" }}>
        {baseCurrency}
      </Text>
    );
  };

  render() {
    // this.readData();
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/BackgroundOrange.png")}
          style={styles.backgroundImage}
        >
          <StatusBar backgroundColor="white" barStyle="light-content" />
          <View style={styles.header}>
            {/*  PAGE TITLE  */}
            <FontAwesome
              style={{ marginLeft: 15 }}
              name="home"
              size={25}
              color="white"
            />
            <FontAwesome
              style={{ marginLeft: 25 }}
              name="question-circle"
              size={25}
              color="white"
            />
            <Text
              style={{
                marginLeft: 24,
                alignItems: "center",
                fontSize: 27,
                textAlign: "center",
                color: "white",
                backgroundColor: "#a9a9a8",
                //fontWeight: "bold",
                borderColor: "FF9933",
                borderRadius: 1,
              }}
            >
              {" "}
              Nutritional Tips{" "}
            </Text>
            <MaterialCommunityIcons
              style={{ marginLeft: 30 }}
              name="circle-expand"
              size={25}
              color="black"
            />

            <this.handleCurrency />
          </View>
          <AppIndex />
        </ImageBackground>
      </View>
    );
  }
}

{
  /*  STYLESHEET  */
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5F7EB2",
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    padding: 10,
    marginTop: 3,
    backgroundColor: "#d9f9b1",
    alignItems: "center",
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  text: {
    color: "#4f603c",
    fontSize: 20,
  },

  taskCard: {
    flex: 5,
    backgroundColor: "#FFE5CC",
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

  header: {
    flexDirection: "row",
  },

  tabs: {
    flex: 1,
    backgroundColor: "#D3E3F6",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left",
  },
});

//         {/*  TABS  */}
//         <View className="NutritionPage">
//           <Tabs
//             tabsProps={{
//               style: {
//                 textAlign: "left",
//               },
//             }}
//             activeTab={{
//               id: "tab1",
//             }}
//           >
//             <View style={styles.tabs}>
//               <Tabs.Tab id="tab1" title="Unread">
//                 <View>
//                   <DataTable>
//                     <DataTable.Header>
//                       <DataTable.Title>[Tip Name]</DataTable.Title>
//                       <DataTable.Title numeric>
//                         Type : [Tip Type]
//                       </DataTable.Title>
//                       <DataTable.Title numeric>
//                         Reward :{" "}
//                         <MaterialCommunityIcons
//                           name="circle-expand"
//                           size={10}
//                           color="black"
//                         />
//                         5
//                       </DataTable.Title>
//                     </DataTable.Header>

//                     <DataTable.Row>
//                       <Text>
//                         [ Task Desceiption : hubvcouehbv hwivoiebuvberu
//                         oibrberoivb reboi1rbiv1bre oboiogiv1uerbgo vi1
//                         rogiv1broigub 1oribgo1i rbgoivu1bro ]
//                       </Text>
//                     </DataTable.Row>

//                     <DataTable.Header>
//                       <DataTable.Title>[Tip Name]</DataTable.Title>
//                       <DataTable.Title numeric>
//                         Type : [Tip Type]
//                       </DataTable.Title>
//                       <DataTable.Title numeric>
//                         Reward :{" "}
//                         <MaterialCommunityIcons
//                           name="circle-expand"
//                           size={10}
//                           color="black"
//                         />
//                         6
//                       </DataTable.Title>
//                     </DataTable.Header>

//                     <DataTable.Row>
//                       <Text>
//                         [ Task Desceiption : hubvcouehbv hwivoiebuvberu oiboivb
//                         reboi1rbiv1bre ov1rbogigo v1rgboirbgovi1 rogiv1broigub
//                         1oribgo1i rbgoivu1br ]
//                       </Text>
//                     </DataTable.Row>

//                     <DataTable.Header>
//                       <DataTable.Title>[Tip Name]</DataTable.Title>
//                       <DataTable.Title numeric>
//                         Type : [Tip Type]
//                       </DataTable.Title>
//                       <DataTable.Title numeric>
//                         Reward :{" "}
//                         <MaterialCommunityIcons
//                           name="circle-expand"
//                           size={10}
//                           color="black"
//                         />
//                         6
//                       </DataTable.Title>
//                     </DataTable.Header>

//                     <DataTable.Row>
//                       <Text>
//                         [ Task Desceiption : hubvcouehbv hwivoiebuvberu oiboivb
//                         reboi1rbiv1bre ov1rbogigo v1rgboirbgovi1 rogiv1broigub
//                         1oribgo1i rbgoivu1br ]
//                       </Text>
//                     </DataTable.Row>
//                   </DataTable>
//                 </View>
//               </Tabs.Tab>

//               <View></View>
//               <Tabs.Tab style={{ color: "#FFFFFF" }} id="tab2" title="Read">
//                 <View>
//                   <DataTable>
//                     <DataTable.Header>
//                       <DataTable.Title>[Tip Name]</DataTable.Title>
//                       <DataTable.Title numeric>
//                         Type : [Tip Type]
//                       </DataTable.Title>
//                       <DataTable.Title numeric>
//                         Reward :{" "}
//                         <MaterialCommunityIcons
//                           name="circle-expand"
//                           size={10}
//                           color="black"
//                         />
//                         7
//                       </DataTable.Title>
//                     </DataTable.Header>

//                     <DataTable.Row>
//                       <Text>
//                         Task Desceiption : hduhv hbrovh hbrofu yuy uyuy
//                         idwefcvwdch bwihbwb wiufebf whebf eoiwbc
//                       </Text>
//                     </DataTable.Row>

//                     <DataTable.Header>
//                       <DataTable.Title>[Tip Name]</DataTable.Title>
//                       <DataTable.Title numeric>
//                         Type : [Tip Type]
//                       </DataTable.Title>
//                       <DataTable.Title numeric>
//                         Reward :{" "}
//                         <MaterialCommunityIcons
//                           name="circle-expand"
//                           size={10}
//                           color="black"
//                         />
//                         8
//                       </DataTable.Title>
//                     </DataTable.Header>

//                     <DataTable.Row>
//                       <Text>
//                         Task Desceiption : hduhv hbrovh hbrofu yuy uyuy
//                         idwefcvwdch bwihbwb wiufebf whebf eoiwbc
//                       </Text>
//                     </DataTable.Row>

//                     <DataTable.Header>
//                       <DataTable.Title>[Tip Name]</DataTable.Title>
//                       <DataTable.Title numeric>
//                         Type : [Tip Type]
//                       </DataTable.Title>
//                       <DataTable.Title style={{ fontWeight: "bold" }} numeric>
//                         Reward :{" "}
//                         <MaterialCommunityIcons
//                           name="circle-expand"
//                           size={10}
//                           color="black"
//                         />
//                         20
//                       </DataTable.Title>
//                     </DataTable.Header>

//                     <DataTable.Row>
//                       <Text>
//                         Task Desceiption : hduhv hbrovh hbrofu yuy uyuy
//                         idwefcvwdch bwihbwb wiufebf whebf eoiwbc
//                       </Text>
//                     </DataTable.Row>
//                   </DataTable>
//                 </View>
//               </Tabs.Tab>
//             </View>
//           </Tabs>
//         </View>
//       </View>
