import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firebase } from "../services/db/firebase_config";

function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.div}>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          mode="outlined"
          outlineColor="#DE3D3D"
          activeOutlineColor="#f50a0c"
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          mode="outlined"
          outlineColor="#DE3D3D"
          activeOutlineColor="#f50a0c"
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
      </View>
      <Button
        mode="outlined"
        color="#DE3D3D"
        onPress={() => {
          loginUser();
        }}
      >
        Login
      </Button>
      <View style={styles.fotter}>
        <Text style={{ color: "black", fontSize: 16, paddingBottom: 50 }}>
          Dont't have an account?
          <Text
            // mode="text"
            style={{ color: "#DE3D3D", fontWeight: "bold", fontSize: 18 }}
            onPress={() => {
              navigation.navigate("Register Donor");
            }}
          >
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // bgImg: {
  //   flex: 1,
  // },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#DE3D3D",
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
