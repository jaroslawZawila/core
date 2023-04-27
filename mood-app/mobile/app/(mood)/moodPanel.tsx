import * as React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text, View} from '../../components/Themed';
import {useNavigation} from "@react-navigation/native";
import {RestService} from "../../services/RestService";
import {MoodLevel} from 'mood-shared';

export default function MoodPanel() {

    const [pressed, setPressed] = useState<boolean>(false);

    const navigation = useNavigation();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {setPressed(false)});
        return unsubscribe;
    }, [navigation]);
    async function save(mood: MoodLevel) {
        const date = new Date(Date.now());
        setPressed(true);
        RestService.saveMood({
            userId: 'future-id',
            mood: mood,
            createdAt: date.toISOString()
        }).then(() => {
            navigation.navigate("(trend)/index");
        });
    }

    function text(mood: MoodLevel) {
        return "I feel " + mood;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>How do you feel:</Text>
            <Pressable onPress={() => save(MoodLevel.Excited)} style={styles.button} disabled={pressed}>
                <Text style={styles.text}>{text(MoodLevel.Excited)}</Text>
            </Pressable>
            <Pressable onPress={() => save(MoodLevel.Up)} style={styles.button} disabled={pressed}>
                <Text style={styles.text}>{text(MoodLevel.Up)}</Text>
            </Pressable>
            <Pressable onPress={() => save(MoodLevel.Normal)} style={styles.button} disabled={pressed}>
                <Text style={styles.text}>{text(MoodLevel.Normal)}</Text>
            </Pressable>
            <Pressable onPress={() => save(MoodLevel.Down)} style={styles.button} disabled={pressed}>
                <Text style={styles.text}>{text(MoodLevel.Down)}</Text>
            </Pressable>
            <Pressable onPress={() => save(MoodLevel.Depressed)} style={styles.button} disabled={pressed}>
                <Text style={styles.text}>{text(MoodLevel.Depressed)}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        margin: 10,
        width: '70 %'

    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
