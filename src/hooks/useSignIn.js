import { useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { LOG_IN } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const history = useHistory();

  const [mutate, result] = useMutation(LOG_IN);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username:username, password:password } });
    await authStorage.setAccessToken(data.authorize.accessToken ? data.authorize.accessToken : '');
    apolloClient.resetStore();
    history.push('/');
    return data;
  };

  return [signIn, result];
};

export default useSignIn;