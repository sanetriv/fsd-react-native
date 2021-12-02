import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepos($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $search: String, $first: Int, $after: String){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $search, first: $first, after: $after){
      totalCount
      edges {
        node  {
          ratingAverage
          stargazersCount
          forksCount
          ownerAvatarUrl
          description
          language
          fullName
          reviewCount
          id
          url
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false, $first: Int, $after: String){
    authorizedUser {
      id
      username
      reviews (first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            repository {
              fullName
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const REPOSITORY = gql`
  query getOneRepo($id: ID!, $first: Int, $after: String){
    repository(id: $id) {
      ratingAverage
      stargazersCount
      forksCount
      ownerAvatarUrl
      description
      language
      fullName
      reviewCount
      id
      url
      reviews (first: $first, after: $after){
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;