import React, { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ex splash-screen medans appen laddar

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('userToken', data.token);
        setUserToken(data.token);
      } else {
        Alert.alert('Felaktigt användarnamn eller lösenord');
      }
    } catch (error) {
      Alert.alert('Något gick fel vid inloggning');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
  };

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) setUserToken(token);
    } catch (e) {
      console.log('Fel vid laddning av token', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, userToken, isAuthenticated: !!userToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};


// Custom hook för att slippa skriva useContext(AuthContext) varje gång
export const useAuth = () => useContext(AuthContext);