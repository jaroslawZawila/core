import {StyleSheet} from 'react-native';

import {Text, View} from '../../components/Themed';
import {MoodButton, MoodLevel} from "./MoodButton";

export default function Index() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your mood:</Text>
      <MoodButton level={MoodLevel.Excited}/>
      <MoodButton level={MoodLevel.Up}/>
      <MoodButton level={MoodLevel.Normal}/>
      <MoodButton level={MoodLevel.Down}/>
      <MoodButton level={MoodLevel.Depressed}/>
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
});
