import {Pressable, StyleSheet, Text} from "react-native";
import {RestService} from "../../services/RestService";

export enum MoodLevel {
    Depressed = "Depressed",
    Down = "Down",
    Normal = "Normal",
    Up = "Up",
    Excited = "Excited"
}

interface MoodButtonProp {
    level: MoodLevel;
}

export const MoodButton = (props: MoodButtonProp) => {

    async function save() {
        const date = new Date(Date.now());
        RestService.saveMood({
            userId: 'future-id',
            mood: props.level.toString(),
            createdAt: date.toISOString()
        });
    }

    const name = "I feel " + props.level;
    return (
        <Pressable onPress={save} style={styles.button}>
            <Text style={styles.text}>{name}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
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
})
