import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {SplashScreen, Stack, Tabs} from 'expo-router';
import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import Index from "./(mood)/mood-panel";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Login} from "../components/Login";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'mood',
};

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    const logged = true;

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    return (
        <>
            {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
            {!loaded && <SplashScreen/>}
            {loaded && !logged && <Login/>}
            {loaded && logged && <RootLayoutNav/>}
        </>
    );
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Tabs>
                 <Tabs.Screen name="[...missing]" options={{ href: null }} />
                 <Tabs.Screen name="(mood)/index" options={{ title: "My Mood" }} />
                 <Tabs.Screen name="(trend)/index" options={{ title: "Trend" }} />
                </Tabs>
            </ThemeProvider>
        </>
    );
}
