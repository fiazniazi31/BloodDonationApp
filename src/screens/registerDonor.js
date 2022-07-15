import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Switch,
  ScrollView,
  ImageBackground,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { firebase } from "../services/db/firebase_config";
import { data } from "../components/staticData/bloodGroups";

// const data = [
//   { label: "A+", value: "1" },
//   { label: "A-", value: "2" },
//   { label: "B+", value: "3" },
//   { label: "B-", value: "4" },
//   { label: "O+", value: "5" },
//   { label: "O-", value: "6" },
//   { label: "AB+", value: "7" },
//   { label: "AB-", value: "8" },
// ];

function RegisterDonor({ navigation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [isAvail, setIsAvail] = useState(false);

  const toggleSwitch = () => setIsAvail((previousState) => !previousState);

  function registerDoner() {
    // call firebase and ask it to register on
    // firebase auth
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        //after a suceess register you take the rest of states
        const donorData = {
          name,
          address,
          phoneNo,
          age,
          email,
          bloodGroup,
          isAvail,
        };
        //
        if (response.user.uid) {
          firebase
            .firestore()
            .collection("donors")
            .doc(response.user.uid)
            .set(donorData);
          Alert.alert(
            "Succeed",
            "Yout are successfully register as donor and login."
          );
        }
      })
      .catch((error) => {
        Alert.alert("❌", "Something Went Wrong, Please Retry");
      });
  }
  // console.log(isAvail);

  return (
    // <ImageBackground
    //   resizeMode="cover"
    //   style={styles.bgimg}
    //   source={require("../../assets/bg.png")}
    // >
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Register Donor</Text>
        <View style={styles.div}>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            mode="outlined"
            outlineColor="#DE3D3D"
            activeOutlineColor="#f50a0c"
            onChangeText={(text) => {
              setName(text);
            }}
          />

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
            placeholder="Select Blood Group"
            searchPlaceholder="Search..."
            value={bloodGroup}
            onChange={(item) => {
              setBloodGroup(item.label);
            }}
            // onChange={(item) => {
            //   setValue(item.value);
            // }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="#DE3D3D"
                name="Safety"
                size={20}
              />
            )}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Email Address"
            mode="outlined"
            outlineColor="#DE3D3D"
            activeOutlineColor="#f50a0c"
            onChangeText={(text) => {
              setEmail(text);
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
            right={<TextInput.Icon name="eye" color="#DE3D3D" />}
          />
          <Text
            style={{ fontWeight: "bold", color: "gray", alignSelf: "center" }}
          >
            {isAvail ? "Donor is Avaliable" : "Donor is not Avaliable"}
          </Text>
          <Switch
            style={{ alignSelf: "center" }}
            trackColor={{ false: "#767577", true: "#f50a0c" }}
            thumbColor={isAvail ? "#DE3D3D" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isAvail}
          />
          {/* <TextInput
            style={styles.input}
            placeholder="Are you avaliable for donation or not?"
            mode="outlined"
            outlineColor="#DE3D3D"
            activeOutlineColor="#f50a0c"
            onChangeText={(text) => {
              setIsAvail(text);
            }}
          /> */}
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            mode="outlined"
            outlineColor="#DE3D3D"
            activeOutlineColor="#f50a0c"
            onChangeText={(text) => {
              setPhoneNo(text);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter age"
            mode="outlined"
            outlineColor="#DE3D3D"
            activeOutlineColor="#f50a0c"
            onChangeText={(text) => {
              setAge(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your City"
            mode="outlined"
            outlineColor="#DE3D3D"
            activeOutlineColor="#f50a0c"
            onChangeText={(text) => {
              setAddress(text);
            }}
          />
        </View>
        <Button
          mode="contained"
          color="#DE3D3D"
          onPress={() => {
            registerDoner();
            navigation.replace("Home");
          }}
          style={{
            borderRadius: 500,
            width: 150,
            height: 50,
            marginTop: 20,
            justifyContent: "center",
          }}
        >
          Save
        </Button>
      </View>
    </ScrollView>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bgimg: {
    flex: 1,
  },
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
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "#DE3D3D",
    borderBottomWidth: 1.0,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#868a8b",
  },
  selectedTextStyle: {
    fontSize: 16,
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

export { RegisterDonor };
