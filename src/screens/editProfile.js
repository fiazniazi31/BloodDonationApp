import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  // Switch,
  ScrollView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firebase } from "../services/db/firebase_config";

function EditProfile({ navigation }) {
  const [isAvail, setIsAvail] = useState("");
  const [person, setPerson] = useState("");
  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("donors")
      .doc(userId)
      .get()
      .then((response) => {
        setPerson(response.data());

        // setLoading(false);
      })
      .catch((error) => {
        Alert.alert("test", "error");
        // setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          {/* <ImageBackground
        style={styles.bgImg}
        source={require("../../assets/bgpic.jpg")}
      > */}
          <Text style={styles.title}>Register Donor</Text>
          <View style={styles.div}>
            <Text>{person.name}</Text>

            <Text>{person.bloodGroup}</Text>

            <Text>{person.email}</Text>

            <Text>{person.phoneNo}</Text>

            <Text>{person.age}</Text>

            <Text>{person.address}</Text>
            <TextInput
              style={styles.input}
              placeholder="Are you avaliable for donation or not?"
              mode="outlined"
              outlineColor="#DE3D3D"
              activeOutlineColor="#f50a0c"
              value={person.isAvail}
              onChangeText={(text) => {
                setIsAvail(text);
              }}
            />
          </View>
          <Button
            mode="outlined"
            color="#DE3D3D"
            // onPress={() => {
            //   registerDoner();
            //   navigation.replace("Login");
            // }}
          >
            Save
          </Button>
          {/* </ImageBackground> */}
        </View>
      </ScrollView>
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
  input: {
    width: 350,
    height: 30,
    backgroundColor: "#F2F2F2",
    margin: 10,
    padding: 10,
    fontSize: 17,
    fontWeight: "500",
  },
});

export { EditProfile };
