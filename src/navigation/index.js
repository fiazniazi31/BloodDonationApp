import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterDonor } from "../screens/registerDonor";
import { Home } from "../screens/home";
import { Login } from "../screens/login";
import { EditProfile } from "../screens/editProfile";
import { DonorList } from "../screens/donorList";

const NavContainer = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register Donor" component={RegisterDonor} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Doner List" component={DonorList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { NavContainer };
