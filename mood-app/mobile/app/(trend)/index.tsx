import {Dimensions, StyleSheet} from 'react-native';

import {Text, View} from '../../components/Themed';
import {LineChart} from "react-native-chart-kit";
import {TrendService} from "../../services/TrendService";

export default function Index() {

    const data = TrendService.getLastWeekTrend('');

    return (
        <View>
            <Text style={styles.title}>Mood over last week:</Text>
            <LineChart
                data={{
                    labels: data.dates,
                    datasets: [
                        {
                            data: data.values
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisInterval={1} // optional, defaults to 1
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
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    }
});
