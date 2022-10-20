import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

const Wrapper = ({ children }) => {
  return (
    <SafeAreaView>
      {children}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Wrapper;
