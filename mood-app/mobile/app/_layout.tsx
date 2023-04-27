import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {SplashScreen, Tabs} from 'expo-router';
import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {Login} from "../components/Login";
import {Text} from '../components/Themed';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(mood)/moodPanel',
};

export default function RootLayout() {

    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    const logged = true;

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) {
            console.log("Nav: " + JSON.stringify(error))
            throw error;
        }
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
                <Tabs initialRouteName={"(mood)/moodPanel"} screenOptions={{
                    headerShown: false,
                }}>
                    <Tabs.Screen name="[...missing]" options={{href: null}}/>
                    <Tabs.Screen name="(mood)/index" options={{title: "My Mood", tabBarIcon: () => <Text>🐱</Text>}}/>
                    <Tabs.Screen name="(trend)/trendPanel"
                                 options={{title: "Trend", tabBarIcon: () => <Text>🐶</Text>}}/>
                </Tabs>
            </ThemeProvider>
        </>
    );
}
