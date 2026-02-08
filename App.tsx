import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Import screens - Note: No .jsx extension needed
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import HomeScreen from './src/screens/user/HomeScreen';
import CommunitiesScreen from './src/screens/user/CommunitiesScreen';
import MeetupsScreen from './src/screens/user/MeetupsScreen';
import ProfileScreen from './src/screens/user/ProfileScreen';
import CommunityDetailScreen from './src/screens/user/CommunityDetailScreen';
import CreateCommunityScreen from './src/screens/host/CreateCommunityScreen';
import HostDashboardScreen from './src/screens/host/HostDashboardScreen';
import CreateMeetupScreen from './src/screens/host/CreateMeetupScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Communities') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Meetups') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Communities" component={CommunitiesScreen} />
      <Tab.Screen name="Meetups" component={MeetupsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function HostTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HostDashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'MyCommunities') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'HostProfile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="HostDashboard" component={HostDashboardScreen} />
      <Tab.Screen name="MyCommunities" component={CommunitiesScreen} />
      <Tab.Screen name="Create" component={CreateCommunityScreen} />
      <Tab.Screen name="HostProfile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={UserTabs} options={{ headerShown: false }} />
        <Stack.Screen name="HostMain" component={HostTabs} options={{ headerShown: false }} />
        <Stack.Screen name="CommunityDetail" component={CommunityDetailScreen} options={{ title: 'Community' }} />
        <Stack.Screen name="CreateCommunity" component={CreateCommunityScreen} options={{ title: 'Create Community' }} />
        <Stack.Screen name="CreateMeetup" component={CreateMeetupScreen} options={{ title: 'Create Meetup' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}