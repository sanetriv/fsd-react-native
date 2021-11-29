import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router';
import Text from './Text';

const styles = StyleSheet.create({
  container : {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginBottom: 5,
    flexGrow: 1,
    flexDirection: 'column'
  },
  infoContainer: {
    flexDirection: 'row',
    flex: 0,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5
  },
  languageContainer: {
    flexGrow: 0,
    paddingHorizontal: 69
  },
  languageItem: {
    backgroundColor: '#0366d6',
    alignSelf: 'flex-start',
    borderRadius: 3
  },
  flexAvatar: {
    paddingRight: 10,
    flexGrow: 0
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 5
  },
  flexInfo: {
    flexGrow: 1,
    flexDirection: 'column',
    flexShrink: 1
  },
  numbersContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
    paddingTop: 10,
    marginBottom: 5
  },
  numbersItem: {
    flexGrow: 0,
    flexDirection: 'column',
    alignItems: 'center'
  },
  singleButton: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    backgroundColor:'#0366d6',
    justifyContent:'center',
    margin: 10
  }
});

const InfoBox = ({item}) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.flexAvatar}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }}/>
      </View>
      <View style={styles.flexInfo}>
        <Text fontWeight='bold'>{item.fullName}</Text>
        <Text >{item.description}</Text>
      </View>
    </View>
  );
};

const LanguageBox = ({item}) => {
  return (
    <View style={styles.languageContainer}>
      <View style={styles.languageItem}>
        <Text color='white' style={{margin:4}}>{item.language}</Text>
      </View>
    </View>
  );
};

const NumbersBox = ({item}) => {
  return (
    <View style={styles.numbersContainer}>
      <View style={styles.numbersItem}>
        <Text testID='stargazersCount' fontWeight='bold'>{item.stargazersCount>1000 ? `${(Math.round(item.stargazersCount/100))/10}k` : item.stargazersCount}</Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.numbersItem}>
        <Text testID='forksCount' fontWeight='bold'>{item.forksCount>1000 ? `${Math.round(item.forksCount/100)/10}k` : item.forksCount}</Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.numbersItem}>
        <Text testID='reviewCount' fontWeight='bold'>{item.reviewCount}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.numbersItem}>
        <Text testID='ratingAverage' fontWeight='bold'>{item.ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

const RepositoryItem = (props) => {
  const history = useHistory();
  return(
    <Pressable onPress={() => history.push(`/:${props.item.id}`)}>
      <View style={styles.container} testID='listItem'>
        <InfoBox item={props.item}/>
        <View></View>
        <LanguageBox item={props.item}/>
        <View></View>
        <NumbersBox item={props.item}/>
        <View></View>
        {props.single ?
          <Pressable style={styles.singleButton} onPress={props.linkToGithub}>
            <Text fontWeight='bold' style={{alignSelf:'center', color:'white'}}>Open in GitHub</Text>
          </Pressable> :
          null}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;