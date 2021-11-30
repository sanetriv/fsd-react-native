import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useHistory } from 'react-router';


const styles = StyleSheet.create({
  flexContainer: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  scroll: {
    flexDirection:'row',
    paddingVertical:10,
    flexGrow:1
  },
  flexItem: {
    flexGrow: 0,
    marginLeft: 10,
    marginRight:10
  }
});

const AppBar = () => {
  const history = useHistory();
  const result = useQuery(AUTHORIZED_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const auth = result.loading ? null : result.data.authorizedUser;
  
  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/signin');
  };

  return (
    <View style={styles.flexContainer}>
      <ScrollView horizontal contentContainerStyle={styles.scroll} centerContent>
        <Pressable style={styles.flexItem}>
          <Link to='/'>
            <Text fontWeight='bold' fontSize='subheading' color='white'>Repositories</Text>
          </Link>
        </Pressable>
        {!auth ? 
          <>
          <Pressable style={styles.flexItem}>
            <Link to='/signin'>
              <Text fontWeight='bold' fontSize='subheading' color='white'>Sign in</Text>
            </Link>
          </Pressable>
          <Pressable style={styles.flexItem}>
            <Link to='/signup'>
              <Text fontWeight='bold' fontSize='subheading' color='white'>Sign up</Text>
            </Link>
          </Pressable></> :
          <>
          <Pressable style={styles.flexItem}>
            <Link to='/createreview'>
              <Text fontWeight='bold' fontSize='subheading' color='white'>Create Review</Text>
            </Link>
          </Pressable>
          <Pressable style={styles.flexItem} onPress={signOut}>
            <Text fontWeight='bold' fontSize='subheading' color='white'>Sign out</Text>
          </Pressable></>}
      </ScrollView>
    </View>
  );
};

export default AppBar;