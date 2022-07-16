import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, ImageBackground, View, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firebase } from "../services/db/firebase_config";

function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (firebase.auth().currentUser !== null) {
      navigation.replace("Home");
    } else {
      //user is logout
    }
  }, []);

  function loginUser() {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((response) => {
        navigation.replace("Home");
      })
      .catch((error) => {
        Alert.alert("Error", "Something went wrong, Please try again");
      });
  }
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.bgimg}
      source={require("../../assets/TopBg.png")}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.div}>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            mode="outlined"
            outlineColor="#3bc4b5"
            activeOutlineColor="#13a0da"
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            mode="outlined"
            outlineColor="#e1dedc"
            activeOutlineColor="#13a0da"
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
          />
        </View>
        <Button
          mode="contained"
          color="#f3f5f5"
          style={{ borderRadius: 50, padding: 5, width: "40%" }}
          onPress={() => {
            loginUser();
          }}
        >
          Login
        </Button>
        <View style={styles.fotter}>
          <Text style={{ color: "#e8ecec", fontSize: 16, paddingBottom: 50 }}>
            Dont't have an account?
            <Text
              // mode="text"
              style={{ color: "#e1dedc", fontWeight: "bold", fontSize: 18 }}
              onPress={() => {
                navigation.navigate("Register Donor");
              }}
            >
              {"\t"}Register
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  bgimg: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontFamily: "serif",
    fontWeight: "normal",
    color: "#f3f5f5",
  },
  input: {
    width: 350,
    height: 30,
    backgroundColor: "#F2F2F2",
    margin: 10,
    padding: 10,
    fontSize: 17,
    fontWeight: "500",
  },
  fotter: {
    alignSelf: "auto",
    paddingTop: 50,
  },
});

export { Login };
