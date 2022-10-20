import { View, Text } from 'react-native';
import React from 'react';

const Card = ({ children }) => {
  return (
    <View className="p-4 my-2 rounded-md shadow-md bg-white w-full">
      {children}
    </View>
  );
};

export default Card;
