import Reactotron from "reactotron-react-native";

const onConnect = () => console.log("####### REACTOTRON CONNECTED #########");

Reactotron.configure({ onConnect, name: "Expo Pharma App" })
  .useReactNative()
  .connect();
