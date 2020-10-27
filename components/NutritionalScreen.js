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
import { fb, Fire } from "../src/firebase/APIKeys";
import * as firebase from "firebase";
import { getBackgroundImage } from "../components/images"
import Header from "../components/Header";

var baseHealth = 0;
var baseStatus = 0;
var baseCurrency = 0;
var userid = Fire.shared.user._id;
console.log(userid);
() => readData();

function readData() {
  console.log(userid);
  firebase
    .database()
    .ref("response/" + userid + "/avatarHealth")
    .once("value", (dataSnapShot) => {
      baseHealth = dataSnapShot.val();
    });
  firebase
    .database()
    .ref("response/" + userid + "/avatarStatus")
    .once("value", (dataSnapShot) => {
      baseStatus = dataSnapShot.val();
    });
  firebase
    .database()
    .ref("response/" + userid + "/currency")
    .once("value", (dataSnapShot) => {
      baseCurrency = dataSnapShot.val();
    });
}

function ReadTab() {
  const [read, allReads] = useState([]);
  useEffect(() => {
    const readRef = firebase
      .database()
      .ref("response/" + userid + "/nutritionalTips");
    const OnLoadingListener = readRef.on("value", (snapshot) => {
      allReads([]);
      snapshot.forEach(function (childSnapshot) {
        allReads((read) => [...read, childSnapshot.val()]);
      });
    });
    return () => {
      readRef.off("value", OnLoadingListener);
    };
  }, []);
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          {read.map(function (item) {
            if (item["complete"]) {
              return (
                <TouchableOpacity
                  key={item["tipID"]}
                  style={styles.textContainer}
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
const submitTip = (id, name, tip, type, reward, complete) => {
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
      .ref("response/" + userid + "/nutritionalTips/" + key)
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
    baseHealth: this.state.baseHealth + rewardHealth["avatarHealth"],
    baseCurr: this.state.baseCurr + rewardHealth["shopCurrency"],
    baseStatus: this.state.baseStatus + rewardHealth["avatarStatus"],
  }));
  fb.database()
    .ref("response/" + userid + "/")
    .update({
      avatarHealth: baseHealth,
      avatarStatus: baseStatus,
      currency: baseCurrency,
    })
    .then(() => {
      console.log("Read a nutritional tip. Congrats!");
    })
    .catch((error) => {
      console.log(error);
    });
}

// Reading Alert to verify if the tip is read.
function reading(item) {
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
          completeTips(item["tipReward"]);
          submitTip(
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
    const unreadRef = firebase
      .database()
      .ref("/response/" + userid + "/nutritionalTips/");
    const OnLoadingListener = unreadRef.on("value", (snapshot) => {
      allUnreads([]);
      snapshot.forEach(function (childSnapshot) {
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
          {unread.map(function (item) {
            if (!item["complete"]) {
              return (
                <TouchableOpacity
                  key={item["tipID"]}
                  style={styles.textContainer}
                  onPress={() => reading(item)}
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
      backgroundColor: 5,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    () => this.readData();
    completeTips = completeTips.bind(this);
    reading = reading.bind(this);
  }

  readData() {
    console.log("reading data in nutritional tip " + userid);
    firebase
      .database()
      .ref("response/" + userid + "/avatarHealth")
      .once("value", (dataSnapShot) => {
        var temp = dataSnapShot.val();
        baseHealth = temp;
        this.setState({ baseHealth: temp });
      });
    firebase
      .database()
      .ref("response/" + userid + "/avatarStatus")
      .once("value", (dataSnapShot) => {
        var temp = dataSnapShot.val();
        baseStatus = temp;
        this.setState({ baseStatus: temp });
      });
    firebase
      .database()
      .ref("response/" + userid + "/currency")
      .once("value", (dataSnapShot) => {
        var temp = dataSnapShot.val();
        baseCurrency = temp;
        this.setState({ baseCurr: temp });
      });
    firebase.database()
      .ref("response/" + userid + "/backgroundColor")
      .once("value", (dataSnapShot) => {
        var tempColor = dataSnapShot.val();
        this.setState({ backgroundColor: tempColor });
      });
  }

  componentDidMount() {
    userid = Fire.shared.user._id;
    this.readData();
    readData();
  }
  handleCurrency = () => {
    return <Text style={{ fontSize: 25, color: "white" }}>{baseCurrency}</Text>;
  };

  render() {
    const background = getBackgroundImage(this.state.backgroundColor);
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={background}
          style={styles.backgroundImage}
        >
          <Header
            props={this.props}
            pageName="Home"
            baseCurrency={this.state.baseCurr}
          />
          {/* <View style={styles.header}>
             
            <FontAwesome
              style={{ marginLeft: 15 }}
              name="home"
              size={25}
              color="white"
            />
            <MaterialIcons
              style={{ marginLeft: 25 }}
              name="settings"
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
                borderColor: "#FF9933",
                borderRadius: 1,
              }}
            >
              {" "}
              Nutritional Tips{" "}
            </Text>
            <MaterialIcons
              style={{ marginLeft: 30 }}
              name="attach-money"
              size={30}
              color="white"
            />
            <this.handleCurrency />
          </View> */}

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

// const childRemovedListener = readRef.on("child_removed", (snapshot) => {
//   // Set Your Functioanlity Whatever you want.
//   alert("Child Removed");
// });

// const childChangedListener = readRef.on("child_changed", (snapshot) => {
//   // Set Your Functioanlity Whatever you want.
//   alert("Child Updated/Changed");
// });
// readRef.off("child_removed", childRemovedListener);
// readRef.off("child_changed", childChangedListener);

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
