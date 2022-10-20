import registerNNPushToken from 'native-notify';
import { StatusBar } from 'expo-status-bar';
import React, { createContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Main from './components/Main';
import Navigation from './components/Navigation';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Wrapper from './components/Custom/Wrapper';
import AssignmentMain from './components/Assignments/AssignmentMain';
import { RealtimeUsers } from './Firebase/authApi';

const Tab = createMaterialBottomTabNavigator();
export const AppCtx = createContext(null);

export default function App() {
  // registerNNPushToken(4266, '5gimiufVdi6DrD2r0veDH1');
  const { data: Users } = RealtimeUsers();

  return (
    <AppCtx.Provider value={{ Users }}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="skyblue"
          inactiveColor="#ccc"
          barStyle={{ backgroundColor: '#fff' }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              // tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Assignments"
            component={AssignmentMain}
            options={{
              tabBarLabel: 'Assignments',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="note-text"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Lineup"
            component={LineupScreen}
            options={{
              // tabBarLabel: 'Lineup',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="note-text"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppCtx.Provider>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <Wrapper>
      <View>
        <Text>Home</Text>
      </View>
    </Wrapper>
  );
};

const LineupScreen = () => {
  return (
    <Wrapper>
      <View className="flex flex-col items-start justify-center h-full">
        <Main />
      </View>
    </Wrapper>
  );
};
