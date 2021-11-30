import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import {Picker} from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce, useDebouncedCallback } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => (
  <RepositoryItem item={item} />
);

export const RepositoryListContainer = ({ repositories }) => {

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      testID='repositorylist'
    />
  );
};

export class RepositoryListClass extends React.Component {

  renderHeader = () => {
    const props = this.props;

    return (
      <>
      <View style={{margin:10}}>
        <Searchbar
          placeholder="Search"
          onChangeText={props.onChange}
          value={props.searchQuery}
        />
      </View>
      <View style={{margin: 10, marginBottom: 15}}>
        <Picker
          selectedValue={props.selectedOrder}
          onValueChange={props.onOrderChange}>
          <Picker.Item label="Latest repositories" value='' />
          <Picker.Item label="Ascending rating" value="ASC" />
          <Picker.Item label="Descending rating" value="DESC" />
        </Picker>
      </View>
      </>
    );
  };

  ItemSeparator = () => <View style={styles.separator} />;

  renderItem = ({ item }) => (
    <RepositoryItem item={item} />
  );
  
  render() {
    this.repositoryNodes = this.props.repositories
    ? this.props.repositories.edges.map(edge => edge.node)
    : [];
    return (
      <FlatList
        data={this.repositoryNodes}
        ItemSeparatorComponent={this.ItemSeparator}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        ListHeaderComponentStyle={{justifyContent:'space-evenly'}}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('');
  const { repositories, refetch, getRefetchParams } = useRepositories(selectedOrder);
  const [searchQuery, setSearchQuery] = useState('');
  //const [value] = useDebounce(searchQuery, 5000);

  const OrderingMenu = () => {
    return(
      <View style={{margin: 10, marginBottom: 15}}>
        <Picker
          selectedValue={selectedOrder}
          onValueChange={(itemValue) => {
              setSelectedOrder(itemValue);
              refetch(selectedOrder, searchQuery);
            }
          }>
          <Picker.Item label="Latest repositories" value='' />
          <Picker.Item label="Ascending rating" value="ASC" />
          <Picker.Item label="Descending rating" value="DESC" />
        </Picker>
      </View>
    );
  };

  const debounce = useDebouncedCallback(
    () => {
      const params = getRefetchParams(selectedOrder, searchQuery);
      console.log(params);
      refetch(params);
    },
    5000
  );

  const onChange = (value) => {
    setSearchQuery(value);
    debounce();
  };

  const HeaderComponent = () => {
    return(
      <>
      <View style={{margin:10}}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChange}
          value={searchQuery}
        />
      </View>
      <OrderingMenu />
      </>
    );
  };  

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <HeaderComponent />}
      ListHeaderComponentStyle={{justifyContent:'space-evenly'}}
    />
  );
};

export default RepositoryList;