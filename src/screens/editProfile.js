import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Switch,
  ScrollView,
} from "react-native";
import {
  TextInput,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import { firebase } from "../services/db/firebase_config";

const LeftContent = (props) => (
  <Avatar.Icon
    style={{ backgroundColor: "#DE3D3D" }}
    {...props}
    icon="information"
  />
);

function EditProfile({ navigation }) {
  // const [isavail, setIsAvail] = useState("");
  const [person, setPerson] = useState("");
  const [isavail, setIsAvail] = useState("");

  const toggleSwitch = () => setIsAvail((previousState) => !previousState);

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
  function update() {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("donors")
      .doc(userId)
      .update({ isAvail: isavail });
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Update Donor</Text>
        <Card mode="elevated" style={styles.card}>
          <Card.Title
            title={"Update Donor"}
            subtitle="Change Availability"
            left={LeftContent}
          />
          <Card.Content>
            <Title>Name: {person.name}</Title>
            <Paragraph>Age: {person.age}</Paragraph>
            <Paragraph>Blood Group: {person.bloodGroup}</Paragraph>
            <Paragraph>Contact No: {person.phoneNo}</Paragraph>
            <Paragraph>Email Address: {person.email}</Paragraph>
            <Paragraph>Address: {person.address}</Paragraph>
            <Text
              style={{
                fontWeight: "bold",
                color: "gray",
                alignSelf: "flex-start",
              }}
            >
              {isavail ? "Donor is Avaliable" : "Donor is not Avaliable"}
            </Text>
            <Switch
              style={{ alignSelf: "center" }}
              trackColor={{ false: "#767577", true: "#f50a0c" }}
              thumbColor={isavail ? "#DE3D3D" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isavail}
            />
            {/* <TextInput
              style={styles.input}
              placeholder="Are you avaliable for donation or not?"
              mode="outlined"
              outlineColor="#DE3D3D"
              activeOutlineColor="#f50a0c"
              // value={person.isAvail}
              onChangeText={(text) => {
                setIsAvail(text);
              }}
            /> */}
          </Card.Content>
          <Card.Actions style={{ alignSelf: "center" }}>
            <Button
              style={{ width: 130 }}
              mode="outlined"
              color="#DE3D3D"
              onPress={() => {
                update();
                navigation.replace("Doner List");
              }}
            >
              Save
            </Button>
          </Card.Actions>
        </Card>
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
    width: 330,
    height: 30,
    backgroundColor: "#F2F2F2",
    // margin: 10,
    padding: 5,
    fontSize: 17,
    fontWeight: "500",
  },
  card: {
    width: 350,
    margin: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#DE3D3D",
    alignSelf: "center",
  },
});

export { EditProfile };
