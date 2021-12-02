import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {

  const getRefetchParams = () => {
    if(!variables.order && !variables.search) {
      return {orderBy:'CREATED_AT', orderDirection:'DESC'};
    }
    if(variables.order!=='' && variables.search!==''){
      return {orderBy:'RATING_AVERAGE', orderDirection:variables.order, search:variables.search};
    }
    if(variables.order!==''){
      return {orderBy:'RATING_AVERAGE', orderDirection:variables.order};
    }
    return {search:variables.search};
  };
  const rfparams = getRefetchParams();

  const repos = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      ...rfparams,
      first: variables.first
    },
    onCompleted: () => console.log('QUERIED') 
  });

  const handleFetchMore = () => {
    const canFetchMore = !repos.loading && repos.data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    repos.fetchMore({
      variables: {
        after: repos.data.repositories.pageInfo.endCursor,
      },
    });
  };

  return { 
    data: repos.data,
    loading: repos.loading,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;