import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

import { Telephony } from "../pages/Telephony";
import { ListTelephony } from "../pages/ListTelephony";
import { ListTotal } from "../pages/ListTotal";

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ff872c",
        tabBarInactiveTintColor: "#969cb2",
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 88,
        },
      }}
    >
      <Screen
        name="Cadastro"
        component={Telephony}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="adduser" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Listagem"
        component={ListTelephony}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="Total"
        component={ListTotal}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="filter" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
