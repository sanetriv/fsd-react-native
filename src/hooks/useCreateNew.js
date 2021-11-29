import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateNew = () => {
  const history = useHistory();
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onCompleted: (data) => {
      history.push(`/${data.createReview.repositoryId}`);
    }
  });

  const createReview = async ({ owner, name, rating, review }) => {
    const { data } = await mutate({
      variables: {
        repositoryName: name,
        ownerName: owner,
        rating: parseInt(rating),
        text: review
      }
    });
    
    return data;
  };

  return [createReview, result];
};

export default useCreateNew;