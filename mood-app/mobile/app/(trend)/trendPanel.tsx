import {Dimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react'
import {Text, View} from '../../components/Themed';
import {LineChart} from "react-native-chart-kit";
import {TrendService} from "../../services/TrendService";
import {TrendResponse} from "mood-shared";
import {useNavigation} from "@react-navigation/native";
import {Config} from "../../services/Config";

export default function TrendPanel() {

    const [state, setState] = useState<TrendResponse>(null);
    const navigation = useNavigation();


    async function fetchData() {
        const appId = await Config.getId();
        const response = await TrendService.getLastWeekTrend(appId);
        console.log("Trend response: " + JSON.stringify(response))
        setState(response);
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchData);
        return unsubscribe;
    }, [navigation]);

    function formatY(s: string) {
            switch (s) {
                case '0':
                    return 'Depressed';
                case '1':
                    return 'Down';
                case '3':
                    return 'Normal';
                case '4':
                    return 'Up';
                case '5':
                    return 'Excited';
                default:
                    console.log("Unexpected: " + s)
                    return '';
            }
        }

    return (
        <View>
            <Text style={styles.title}>Mood over last week:</Text>
            <Text>{state && JSON.stringify(state)}</Text>
            { !state && <Text>Loading data ....</Text>}
            { state && <Text>Not enough data to draw a graph</Text>}
            { state && <LineChart
                data={{
                    labels: state.dates,
                    datasets: [
                        {
                            data: state.values
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisInterval={2} // optional, defaults to 1
                fromZero={true}
                formatYLabel={formatY}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    }
});
