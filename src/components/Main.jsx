import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import { Route, Switch, Redirect } from 'react-router-native';
import SignIn from './SignIn';
import SingleRepo from './SingleRepo';
import CreateReview from './CreateReview';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
      <Route path="/createreview" exact>
            <CreateReview />
        </Route>
        <Route path="/signin" exact>
            <SignIn />
        </Route>
        <Route path="/:id" exact>
            <SingleRepo />
        </Route>
        <Route path="/" exact>
            <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;