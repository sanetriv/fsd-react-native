import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce/lib";
import useRepositories from "../hooks/useRepositories";
import { RepositoryListClass } from "./RepositoryList";
import Text from "./Text";

const RepoListBuilder = () => {
  const [selectedOrder, setSelectedOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, fetchMore } = useRepositories(
    {
      order: selectedOrder,
      search: searchQuery,
      first: 6
    }
  );

  if (!data) {
    return <Text>Loading...</Text>;
  }

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
    //setSearchQuery(value);
  };


  const onOrderChange = (value) => {
    debounceOrder.cancel();
    debounceOrder(value);
    //setSelectedOrder(value);
  };

  const onEndReach = () => {
    fetchMore();
  };

  return(
    <RepositoryListClass
      onChange={onChange}
      repositories={data.repositories}
      search={searchQuery}
      order={selectedOrder}
      onOrderChange={onOrderChange}
      onEndReach={onEndReach}
    />
  );
};

export default RepoListBuilder;