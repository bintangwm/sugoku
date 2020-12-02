import React from 'react';
import { 
  StyleSheet,
  Text, 
  Button,
  ImageBackground,
  View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux'
import { resetGame } from '../actions/index'
import bgImage from '../assets/bohemian.jpg'

export default function Finish({ navigation, route }) {
  const { name, difficulty } = route.params
  const score = useSelector(store => store.score)
  const scoreBoard = useSelector(store => store.scoreBoard)
  const dispatch = useDispatch()

  function goToHomeScreen() {
    dispatch(resetGame())
    navigation.navigate('Home')
  }

  return (
    <ImageBackground source={bgImage} style={styles.imageBackground}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.congratulation}>Congratulation</Text>
          <Text style={styles.name}>{ name }</Text>
          <Text style={styles.score}>Score: { score }</Text>
          <Text style={styles.difficulty}>Difficulty: { difficulty }</Text>
          <Button 
            title='Play Again'
            onPress={goToHomeScreen}
            color='green'
          />
          <View style={styles.leaderBoard}>
            <Text style={{ fontSize: 25 }}>Leader Board</Text>
            <View style={styles.leaderBoardHeader}>
              <View style={styles.leaderBoardItem}>
                <Text style={{ fontSize: 20 }}>Player name</Text>
                {
                scoreBoard.map((player, i) => (
                    <View key={ i }>
                      <Text>{ player.name } </Text>
                    </View>
                  ))
                }
              </View>
              <View style={styles.leaderBoardItem}>
                <Text style={{ fontSize: 20 }}> Score</Text>
                {
                scoreBoard.map((player, i) => (
                    <View key={ i }>
                      <Text>{ player.score } </Text>
                    </View>
                  ))
                }
              </View>
              <View style={styles.leaderBoardItem}>
                <Text style={{ fontSize: 20 }}> Difficulty</Text>
                {
                scoreBoard.map((player, i) => (
                    <View key={ i }>
                      <Text>{ player.difficulty } </Text>
                    </View>
                  ))
                }
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaderBoard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  leaderBoardHeader: {
    flexDirection: 'row'
  },
  leaderBoardItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40%'
  },
  congratulation: {
    fontSize: 50
  },
  name: {
    marginTop: '20%',
    fontSize: 40
  },
  difficulty: {
    fontSize: 15,
    marginBottom: '40%'
  },
  score: {
    fontSize: 15,
    marginTop: 15
  }
});
