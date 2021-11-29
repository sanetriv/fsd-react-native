import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  //const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const repos = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  const fetchRepositories = async () => {
    setLoading(true);

    //const response = await fetch('http://192.168.8.123:5000/api/repositories');
    //const json = await response.json();

    setLoading(false);
  };

  /*useEffect(() => {
    fetchRepositories();
  }, []);*/
  
  return { repositories:repos.loading?null:repos.data.repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;