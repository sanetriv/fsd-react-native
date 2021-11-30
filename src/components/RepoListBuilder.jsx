import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce/lib";
import useRepositories from "../hooks/useRepositories";
import { RepositoryListClass } from "./RepositoryList";

const RepoListBuilder = () => {
  const [selectedOrder, setSelectedOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { repositories, fetchMore } = useRepositories(
    {
      
      order: selectedOrder,
      search: searchQuery,
      first: 6
    }
  );

  const debounceOrder = useDebouncedCallback(
    (value) => {
      setSelectedOrder(value);
    },
    500
  );

  const debounceSearch = useDebouncedCallback(
    (value) => {
      setSearchQuery(value);
    },
    500
  );

  const onChange = (value) => {
    debounceSearch.cancel();
    debounceSearch(value);
  };


  const onOrderChange = (value) => {
    debounceOrder.cancel();
    debounceOrder(value);
    //const params = getRefetchParams(selectedOrder, searchQuery);
    //refetch(params);
  };

  const onEndReach = () => {
    console.log('END REACHED');
    fetchMore();
  };

  return(
    <RepositoryListClass
      onChange={onChange}
      repositories={repositories}
      search={searchQuery}
      order={selectedOrder}
      onOrderChange={onOrderChange}
      onEndReach={onEndReach}
      />
  );
};

export default RepoListBuilder;