import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, Image, View, Button, Alert } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={styles.avatarContainer}>
        <Text>G'day, staying healthy?</Text>
        <Image style={styles.avatar} source={require("../assets/avatar.png")} />
        <Button
          color="fuchsia"
          title="Feed Avatar"
          onPress={() => Alert.alert("Avatar:", "Thank you!")}
        />
        <StatusBar style="auto" />
      </View>

      <View style={styles.menuContainer}>
        <Button
          title="Quest"
          onPress={() => console.log("Quest Button Pressed")}
        />
        <Button
          title="Nutritional Tips"
          onPress={() => console.log("Nutritional Tips Button Pressed")}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
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
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1.5,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    justifyContent: "center",
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  avatar: {
    width: 175,
    height: 175,
  },
});
