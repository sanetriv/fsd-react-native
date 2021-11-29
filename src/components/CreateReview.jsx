import { Formik } from 'formik';
import React from 'react';
import { Pressable, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import Text from './Text';
import { useHistory } from 'react-router';
import useCreateNew from '../hooks/useCreateNew';

const styles = {
  signInContainer: {
    flexDirection: 'column',
    margin: 10,
    flexGrow: 1
  },
  button: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor:'#0366d6',
    justifyContent:'center'
  }
};

const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required('Username is required'),
  name: yup
    .string()
    .required('Name is required'),
  rating: yup
    .number().min(0).max(100)
    .required(),
  review: yup
    .string()
});

const CreateReview = () => {
  const [createNew] = useCreateNew();
  const onSubmit = async (values) => {
    const { owner, name, rating, review } = values;

    try {
      const { data } = await createNew({ owner, name, rating, review });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const init = {
    owner:'',
    name:'',
    rating:'',
    review:''
  };
  const CreateReviewForm = ({onSubmit}) => {
    return(
      <View style={styles.signInContainer}>
        <FormikTextInput name='owner' placeholder='Repository owner name' />
        <View></View>
        <FormikTextInput name='name' placeholder='Repository name' />
        <View></View>
        <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
        <View></View>
        <FormikTextInput name='review' placeholder='Review' multiline={true} />
        <View></View>
        <Pressable onPress={onSubmit} style={{backgroundColor:'#0366d6', borderRadius:3, height:40, justifyContent:'center'}}>
          <Text fontWeight='bold' style={{alignSelf:'center', color:'white'}}>Create a review</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <View>
      <Formik initialValues={init} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default CreateReview;