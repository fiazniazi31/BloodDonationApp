import { View, StyleSheet, FlatList, Switch, Text } from "react-native";
import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
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
  console.log(id);
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
                <Paragraph>Avaliable: {item.isAvail}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained" style={{ backgroundColor: "#DE3D3D" }}>
                  Edit
                </Button>
              </Card.Actions>
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
