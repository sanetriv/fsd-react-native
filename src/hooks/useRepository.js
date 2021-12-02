import { useQuery } from '@apollo/client';
import { REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const howMany = 6;
  const repos = useQuery(REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: id.startsWith(':') ? id.substring(1) : id,
      first: howMany
    },
    onCompleted: () => console.log('SINGLE QUERIED')
  });

  const handleFetchMore = () => {
    const canFetchMore = !repos.loading && repos.data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    repos.fetchMore({
      variables: {
        after: repos.data.repository.reviews.pageInfo.endCursor,
        id: id.startsWith(':') ? id.substring(1) : id,
        first: howMany
      },
    });
  };

  return { 
    data: repos.data,
    loading: repos.loading,
    fetchMore: handleFetchMore,
    refetch: repos.refetch
  };
};

export default useRepository;