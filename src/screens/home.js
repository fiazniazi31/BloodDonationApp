import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Paragraph } from "react-native-paper";
import { firebase } from "../services/db/firebase_config";

function Home({ navigation }) {
  // const id = firebase.auth().currentUser.uid;
  // console.log(id);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donate Blood</Text>
      <Text style={styles.title}>Save World</Text>

      <Button
        mode="contained"
        style={{
          margin: 20,
          width: "50%",
          padding: 5,
          backgroundColor: "#DE3D3D",
        }}
        onPress={() => {
          navigation.navigate("Edit Profile");
        }}
      >
        Edit Your Data
      </Button>
      {/* <Button
        mode="contained"
        style={{
          margin: 20,
          width: "50%",
          padding: 5,
          backgroundColor: "#DE3D3D",
        }}
        onPress={() => {
          navigation.navigate("Register Donor");
        }}
      >
        Register as Donor
      </Button> */}
      <Button
        mode="contained"
        style={{
          margin: 20,
          width: "50%",
          padding: 5,
          backgroundColor: "#DE3D3D",
        }}
        onPress={() => {
          navigation.navigate("Doner List");
        }}
      >
        Find Donor
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3e3e2",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#DE3D3D",
  },
  paragraph: {
    fontSize: 20,
    color: "#DE3D3D",
    textAlign: "justify",
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#DE3D3D",
  },
});

export { Home };
