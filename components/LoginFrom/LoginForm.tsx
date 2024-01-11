import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import usersStore from '../../stores/usersStore';

type FormLoginData = {
  email: string;
  password: string;
};
export const LoginForm = observer(() => {
  const navigation: any = useNavigation();
  const [isUser, setIsUser] = useState(true);
  const {users} = usersStore;

  const {handleSubmit, control, formState} = useForm<FormLoginData>();
  const {errors} = formState;

  const onSubmit: SubmitHandler<FormLoginData> = data => {
    users.length > 0 &&
      users.some(el => {
        if (el.email === data.email && el.password === data.password) {
          setIsUser(true);
          navigation.navigate('Home');
        }
        setIsUser(false);
      });
  };

  return (
    <View style={styles.block}>
      <Text style={styles.labelText}>Email:</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              textContentType="emailAddress"
              onBlur={onBlur}
              onChangeText={el => onChange(el)}
              value={value}
            />
            <Text style={styles.errorText}>
              {errors.email?.message as string}
            </Text>
          </>
        )}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Invalid email format',
          },
        }}
      />

      <Text style={styles.labelText}>Password:</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              textContentType="password"
              onBlur={onBlur}
              onChangeText={el => onChange(el)}
              value={value}
            />
            <Text style={styles.errorText}>
              {errors.password?.message as string}
            </Text>
          </>
        )}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
          validate: value => {
            return (
              (/[A-Z]/.test(value) &&
                /[a-z]/.test(value) &&
                /\d/.test(value)) ||
              'Invalid password format'
            );
          },
        }}
      />
      {!isUser && <Text>Such A User Does Not Exist</Text>}
      <View style={styles.buttonBlock}>
        <Button title="Sign In" color="#FFF" onPress={handleSubmit(onSubmit)} />
        <Button
          title="Sign Up"
          color="#FFF"
          onPress={() => navigation.navigate('Registration')}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  block: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    margin: 20,
    padding: 10,
    backgroundColor: '#3498db',
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    height: 40,
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  buttonBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
});
