import { useState } from 'react';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text, TextField, View } from 'react-native-ui-lib';
import { Credentials, useAuth } from '../../auth/AuthContext';
import PasswordField from '../../components/PasswordField';

const LoginScreen = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });

  const { login, signup } = useAuth();
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextField
          value={credentials.username}
          style={styles.inputText}
          autoCapitalize="none"
          placeholder="username"
          id="username"
          onChangeText={(username) =>
            setCredentials({ ...credentials, username })
          }
        />
      </View>
      <View style={styles.inputView}>
        <PasswordField
          style={styles.inputText}
          value={credentials.password}
          onChangeText={(password) =>
            setCredentials({ ...credentials, password })
          }
        />
      </View>
      <Button label="Login" onPress={() => login(credentials)} />
      <Button label="Sign up" onPress={() => signup(credentials)} />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
  },
});
