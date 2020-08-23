import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, Image, View, Button, Alert } from "react-native";

function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Text>[Happiness Bar]</Text>
        <Text>[Status Bar]</Text>
        <Image style={styles.avatar} source={require("../assets/avatar.png")} />
        <Text style={styles.avatarDialogue}>
          [AvatarName]: G'day[UserName], staying healthy?
        </Text>
        {/* <Button
          color="fuchsia"
          title="Feed Avatar"
          onPress={() => Alert.alert("Avatar:", "Thank you!")}
        /> */}
        <StatusBar style="auto" />
      </View>

      <View style={styles.menuContainer}>
        <Button
          title="Quests"
          onPress={() => console.log("Quests Button Pressed")}
        />

        <Button
          title="Items"
          onPress={() => console.log("Items Button Pressed")}
        />

        <Button
          title="Nutritional Tips"
          onPress={() => console.log("Nutritional Tips Button Pressed")}
        />

        <Button
          title="Socialise"
          onPress={() => console.log("Socialise Button Pressed")}
        />

        <Button
          title="Setting"
          onPress={() => console.log("Setting Button Pressed")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f8ff",
    flex: 1,
    flexDirection: "row",
    paddingTop: 10,
  },

  avatarContainer: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },

  menuContainer: {
    flex: 0.9,
    alignItems: "stretch",
    justifyContent: "space-around",
    padding: 10,
  },

  avatar: {
    width: 200,
    height: 200,
    margin: 5,
  },

  avatarDialogue: {
    backgroundColor: "#dcdcdc",
    borderWidth: 1,
    borderRadius: 5,
    width: 250,
    padding: 10,
    marginTop: "auto",
    marginBottom: 10,
  },
});

export default Home;
