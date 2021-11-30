import { Formik } from 'formik';
import React from 'react';
import { Pressable, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import useCreateUser from '../hooks/useCreateUser';

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
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
  passwordConfirmation: yup
    .string().oneOf([yup.ref('password'), null], "Passwords don't match")
    .required('Password confirmation is required')
});

const SignUp = () => {
  const [signIn] = useSignIn();
  const [createUser] = useCreateUser();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const created = await createUser({ username, password });
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const init = {
    username:'',
    password:'',
    passwordConfirmation:''
  };
  const SignUpForm = ({onSubmit}) => {
    return(
      <View style={styles.signInContainer}>
        <FormikTextInput name='username' placeholder='Username' />
        <View></View>
        <FormikTextInput name='password' placeholder='Password' secureTextEntry={true}/>
        <View></View>
        <FormikTextInput name='passwordConfirmation' placeholder='Password confirmation' secureTextEntry={true}/>
        <View></View>
        <Pressable onPress={onSubmit} style={{backgroundColor:'#0366d6', borderRadius:3, height:40, justifyContent:'center'}}>
          <Text fontWeight='bold' style={{alignSelf:'center', color:'white'}}>Sign up</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <View>
      <Formik initialValues={init} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignUp;