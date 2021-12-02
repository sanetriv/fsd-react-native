import { useQuery } from "@apollo/client";
import { AUTHORIZED_USER } from "../graphql/queries";

const useAuthorizedUser = () => {
  const howMany = 6;
  const result = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews: true,
      first: howMany
    }
  });

  const handleFetchMore = () => {
    const canFetchMore = !result.loading && result.data?.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return 0;
    }
    result.fetchMore({
      variables: {
        after: result.data.authorizedUser.reviews.pageInfo.endCursor
      },
    });
    return 1;
  };

  return { data:result.data, loading:result.loading, fetchMore:handleFetchMore, refetch:result.refetch }; 
};

export default useAuthorizedUser;