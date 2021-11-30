import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  //const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

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
    variables: { ...variables,
      ...rfparams
    },
    onCompleted: () => console.log('QUERIED') 
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && repos.data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    const params = getRefetchParams();
    repos.fetchMore({
      variables: {
        after: repos.data.repositories.pageInfo.endCursor,
        ...params
      },
    });
  };

  const fetchRepositories = async (variables) => {
    //setLoading(true);
    //const response = await fetch('http://192.168.8.123:5000/api/repositories');
    //const json = await response.json();
    //setLoading(false);
    await repos.refetch(variables);
  };

  return { 
    repositories:repos.loading?null:repos.data.repositories,
    loading: repos.loading,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;