import { format } from "date-fns";
import React from "react";
import { FlatList, Linking, StyleSheet, View } from "react-native";
import { useParams } from "react-router";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
  reviewItemContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 5
  },
  ratingCircle: {
    borderWidth: 3,
    borderColor: '#0366d6',
    height: 45,
    width: 45,
    borderRadius: 45/2,
    justifyContent: 'center',
    margin: 5
  },
  commenterInfo: {
    flexDirection: 'column',
    flex: 0,
    marginTop: 8,
    marginLeft: 5
  },
  reviewInfoContainer: {
    flexDirection: 'row'
  },
  commentContainer: {
    paddingLeft: 60,
    paddingBottom: 5
  },
  reviewText: {
    color: '#0366d6',
    alignSelf: 'center'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepo = () => {
  const { id } = useParams();
  const { data, loading, fetchMore } = useRepository(id);
  const goToGithub = () => {
    Linking.openURL(data.repository.url);
  };

  if (!data) {
    return <Text>Loading...</Text>;
  }

  const ReviewItem = ({ review }) => {
    const date = review.createdAt.split('-');
    const day = date[2].substring(0,2);
    return (
      <View style={styles.reviewItemContainer}>
        <View style={styles.reviewInfoContainer}>
          <View style={styles.ratingCircle}>
            <Text fontWeight='bold' style={styles.reviewText}>{review.rating}</Text>
          </View>
          <View style={styles.commenterInfo}>
            <Text fontWeight='bold'>{review.user.username}</Text>
            <Text style={{color:'gray'}}>{format(new Date(date[0],(parseInt(date[1])-1).toString(),day),'dd.MM.yyyy')}</Text>
          </View>
        </View>
        <View style={styles.commentContainer}>
          <Text>{review.text}</Text>
        </View>
      </View>
    );
  };

  const reviews = data.repository.reviews
    ? data.repository.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => <RepositoryItem item={data.repository} single={true} linkToGithub={goToGithub} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </>
  );
};

export default SingleRepo;