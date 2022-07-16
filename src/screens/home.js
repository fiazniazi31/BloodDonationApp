import * as React from "react";
import { StyleSheet, ImageBackground, Text, View, Alert } from "react-native";
import { Button } from "react-native-paper";
import { firebase } from "../services/db/firebase_config";

function Home({ navigation }) {
  // const id = firebase.auth().currentUser.uid;
  // console.log(id);

  function logOutUser() {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        Alert.alert(error);
      });
  }
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.bgimg}
      source={require("../../assets/TopBg.png")}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Donate Blood</Text>
        <Text style={styles.title}>Save World</Text>

        <Button
          color="#f3f5f5"
          mode="contained"
          style={{
            margin: 20,
            width: "50%",
            borderRadius: 50,
            padding: 5,
          }}
          onPress={() => {
            navigation.navigate("Edit Profile");
          }}
        >
          Update Availability
        </Button>

        <Button
          mode="contained"
          color="#f3f5f5"
          style={{
            margin: 20,
            width: "50%",
            borderRadius: 50,
            padding: 5,
          }}
          onPress={() => {
            navigation.navigate("Doner List");
          }}
        >
          Find Donor
        </Button>
        <Button
          mode="contained"
          color="#f3f5f5"
          style={{
            margin: 20,
            width: "50%",
            padding: 5,
            borderRadius: 50,
          }}
          onPress={() => {
            logOutUser();
            navigation.replace("Login");
          }}
        >
          Log Out
        </Button>
      </View>
      {/* {" "} */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 38,
    fontFamily: "serif",
    fontWeight: "normal",
    color: "#f3f5f5",
  },
  bgimg: {
    flex: 1,
  },
});

export { Home };
