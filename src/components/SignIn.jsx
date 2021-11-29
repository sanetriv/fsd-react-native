import { Formik } from 'formik';
import React from 'react';
import { Pressable, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';

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
});

export const SignInContainer = ({ onSubmit }) => {
  const init = {
    username:'',
    password:''
  };
  const SignInForm = ({onSubmit}) => {
    return(
      <View style={styles.signInContainer}>
        <FormikTextInput name='username' placeholder='Username' />
        <View></View>
        <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
        <View></View>
        <Pressable testID='submitSignIn' onPress={onSubmit} style={{backgroundColor:'#0366d6', borderRadius:3, height:40, justifyContent:'center'}}>
          <Text style={{alignSelf:'center', color:'white'}}>Sign in</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <View>
      <Formik initialValues={init} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  let wrong = false;
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      wrong = true;
      console.log(e);
    }
  };
  const init = {
    username:'',
    password:''
  };
  const SignInForm = ({onSubmit}) => {
    return(
      <View style={styles.signInContainer}>
        <FormikTextInput name='username' placeholder='Username' />
        <View></View>
        <FormikTextInput name='password' placeholder='Password' secureTextEntry={true}/>
        <View></View>
        <Pressable onPress={onSubmit} style={{backgroundColor:'#0366d6', borderRadius:3, height:40, justifyContent:'center'}}>
          <Text style={{alignSelf:'center', color:'white'}}>Sign in</Text>
        </Pressable>
        <View>
          {wrong ? <Text style={{color:'red'}}>Invalid username or password</Text>:null}
        </View>
      </View>
    );
  };
  return (
    <View>
      <Formik initialValues={init} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;