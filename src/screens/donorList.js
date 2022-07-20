import { View, StyleSheet, FlatList, ImageBackground } from "react-native";
import * as React from "react";
import {
  Avatar,
  TextInput,
  Card,
  Title,
  Text,
  Paragraph,
} from "react-native-paper";
import { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { firebase } from "../services/db/firebase_config";
import { data } from "../components/staticData/bloodGroups";

const LeftContent = (props) => (
  <Avatar.Icon
    style={{ backgroundColor: "#DE3D3D" }}
    {...props}
    icon="information"
  />
);

const DonorList = ({ route }) => {
  const [person, setPerson] = useState();
  const [BloodGroup, setBloodGroup] = useState("");
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
  // const id = firebase.auth().currentUser.uid;
  // console.log(id);
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.bgimg}
      source={require("../../assets/bg.png")}
    >
      <View style={styles.container}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="label"
          placeholder="Search by Blood Group"
          searchPlaceholder="Type Blood Group"
          // value={bloodGroup}
          onChange={(item) => {
            setBloodGroup(item.label);
          }}
        />
        {BloodGroup === "" ? (
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
        ) : (
          <FlatList
            data={person?.filter((data) => data?.bloodGroup === BloodGroup)}
            keyExtractor={(item) => `${item.id}`}
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
        )}
      </View>
    </ImageBackground>
  );
};
export { DonorList };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    // alignItems: "center",
    justifyContent: "center",
  },
  card: {
    margin: 10,
    paddingLeft: 10,
    paddingBottom: 15,
    borderRadius: 30,
  },
  bgimg: {
    flex: 1,
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: "white",
    borderBottomColor: "#DE3D3D",
    borderBottomWidth: 1.0,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#868a8b",
    paddingLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    // height: 40,
    fontSize: 16,
  },
});
