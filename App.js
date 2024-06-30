import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginScreen from "./components/loginScreen";
import MainDashboard from "./components/MainDashboard";
import StudexDashboard from "./components/StudexDashboard";
import SearchStudex from "./components/SearchStudex";
import Birthday from "./components/Birthday";
import CustomSplash from "./components/CustomSplash";

const Stack = createStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppReady(true);
    }, 9000);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {appReady ? (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainDashboard" component={MainDashboard} />
            <Stack.Screen name="StudexDashboard" component={StudexDashboard} />
            <Stack.Screen name="SearchStudex" component={SearchStudex} />
            <Stack.Screen name="Birthday" component={Birthday} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <CustomSplash />
      )}
    </QueryClientProvider>
  );
};

export default App;
