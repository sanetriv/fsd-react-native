import { format } from "date-fns";
import React, { useRef, useState } from "react";
import { Alert, FlatList, Linking, Pressable, StyleSheet, View } from "react-native";
import { useHistory, useParams } from "react-router";
import useAuthorizedUser from "../hooks/useAuthorizedUser";
import useDeleteReview from "../hooks/useDeleteReview";
import useRepository from "../hooks/useRepository";
import useSignIn from "../hooks/useSignIn";
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
  },
  blueButton: {
    borderRadius: 3,
    paddingTop: 10,
    paddingBottom: 10,
    width: '45%',
    backgroundColor:'#0366d6',
    justifyContent:'center',
    marginTop: 10
  },
  redButton: {
    borderRadius: 3,
    paddingTop: 10,
    paddingBottom: 10,
    width: '45%',
    backgroundColor:'red',
    justifyContent:'center',
    marginTop: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const flatList = useRef();
  const history = useHistory();
  const { data, loading, fetchMore, refetch } = useAuthorizedUser();
  const { deleteReview } = useDeleteReview();

  if (!data){
    return <Text>Loading...</Text>;
  }
  
  const onMoveSubmit = (review) => {
    history.push(`/${review.repositoryId}`);
  };

  const onDeleteSubmit = (review) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: 'Delete',
          onPress: () => {
            deleteReview(review.id);
            console.log('refetch???');
            refetch();
          },
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

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
            <Text fontWeight='bold'>{review.repository.fullName}</Text>
            <Text style={{color:'gray'}}>{format(new Date(date[0],(parseInt(date[1])-1).toString(),day),'dd.MM.yyyy')}</Text>
          </View>
        </View>
        <View style={styles.commentContainer}>
          <Text>{review.text}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-evenly', flexGrow:1}}>
          <Pressable onPress={() => onMoveSubmit(review)} style={styles.blueButton}>
            <Text fontWeight='bold' style={{alignSelf:'center', color:'white'}}>View repository</Text>
          </Pressable>
          <Pressable onPress={() => onDeleteSubmit(review)} style={styles.redButton}>
            <Text fontWeight='bold' style={{alignSelf:'center', color:'white'}}>Delete review</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const reviews = data.authorizedUser.reviews
    ? data.authorizedUser.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  const renderItem = ({ item }) => {
    return <ReviewItem review={item} />;
  };

  const keys = ({ id }) => {
    return id;
  };

  return (
    <>
      <FlatList
        ref={flatList}
        data={reviews}
        renderItem={renderItem}
        keyExtractor={keys}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </>
  );
};

export default MyReviews;