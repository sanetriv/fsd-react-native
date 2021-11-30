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
  query {
    authorizedUser {
      id
      username
    }
  }
`;

export const REPOSITORY = gql`
  query getOneRepo($id: ID!){
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
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;