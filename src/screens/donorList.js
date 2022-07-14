import { View, StyleSheet, FlatList, Switch } from "react-native";
import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Text,
  Paragraph,
} from "react-native-paper";
import { useState, useEffect } from "react";
import { firebase } from "../services/db/firebase_config";

const LeftContent = (props) => (
  <Avatar.Icon
    style={{ backgroundColor: "#DE3D3D" }}
    {...props}
    icon="information"
  />
);

const DonorList = ({ route }) => {
  const [person, setPerson] = useState();
  const donorListRef = firebase.firestore().collection("donors");
  // console.log(person);

  useEffect(() => {
    donorListRef.onSnapshot((querySnapshot) => {
      const persons = [];
      querySnapshot.forEach((doc) => {
        const { name, email, address, age, phoneNo, bloodGroup, isAvail } =
          doc.data();
        persons.push({
          id: doc.id,
          name,
          email,
          address,
          age,
          phoneNo,
          bloodGroup,
          isAvail,
        });
      });
      setPerson(persons);
    });
  }, []);
  const id = firebase.auth().currentUser.uid;
  // console.log(id);
  return (
    <View>
      <View>
        <FlatList
          data={person}
          renderItem={({ item }) => (
            <Card mode="elevated" style={styles.card}>
              <Card.Title
                title={"Blood Donor"}
                // subtitle="Card Subtitle"
                left={LeftContent}
              />
              <Card.Content>
                <Title>Name: {item.name}</Title>
                <Paragraph>Age: {item.age}</Paragraph>
                <Paragraph>Blood Group: {item.bloodGroup}</Paragraph>
                <Paragraph>Contact No: {item.phoneNo}</Paragraph>
                <Paragraph>Email Address: {item.email}</Paragraph>
                <Paragraph>Address: {item.address}</Paragraph>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                    alignSelf: "center",
                  }}
                >
                  {item.isAvail
                    ? "Donor is Avaliable"
                    : "Donor is not Avaliable"}
                </Text>
                {/* <Paragraph>Avaliable: {item.isAvail}</Paragraph> */}
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </View>
  );
};
export { DonorList };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    margin: 10,
    paddingLeft: 10,
    paddingBottom: 15,
  },
});
