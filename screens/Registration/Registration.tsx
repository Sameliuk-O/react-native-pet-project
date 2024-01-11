import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {UserInterface} from '../../interfaces/UserInterface';
import usersStore from '../../stores/usersStore';

type FormRegisterData = {
  email: string;
  password: string;
  userName: string;
};

export const Registration = () => {
  const navigation: any = useNavigation();
  const {handleSubmit, control, formState} = useForm<FormRegisterData>();
  const {errors} = formState;

  const onSubmit: SubmitHandler<FormRegisterData> = (data: UserInterface) => {
    usersStore.registerUser(data);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.block}>
      <Text style={styles.labelText}>User Name:</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="User Name"
              onBlur={onBlur}
              onChangeText={el => onChange(el)}
              value={value}
            />
            <Text style={styles.errorText}>
              {errors.userName?.message as string}
            </Text>
          </>
        )}
        name="userName"
        rules={{
          required: 'User Name is required',
          minLength: {
            value: 3,
            message: 'User Name must be at least 3 characters long',
          },
          maxLength: {
            value: 20,
            message: 'User Name cannot exceed 20 characters',
          },
          pattern: {
            value: /^[A-Za-z]+$/i,
            message: 'Invalid User Name format (only letters are allowed)',
          },
        }}
      />

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

      <View style={styles.buttonBlock}>
        <Button
          title="Back To Sign In"
          color="#FFF"
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          title="Create Account"
          color="#FFF"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

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
