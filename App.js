import { NavContainer } from "./src/navigation/";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#DE3D3D" />
      <NavContainer />
    </>
  );
}
