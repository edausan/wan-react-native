import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Navigation = () => {
  return (
    <View className="flex flex-row sticky bottom-0 bg-white w-full">
      <Pressable
        onPress={() => console.log('HOME')}
        className="flex-1 flex items-center justify-center p-4"
      >
        {/* <View className="p-6 bg-red-200 flex-1 flex items-center justify-center"> */}
        <MaterialCommunityIcons name="home-outline" size={24} color="black" />
        {/* </View> */}
      </Pressable>
      <Pressable
        onPress={() => console.log('LINEUP')}
        className="p-4 bg-red-100 flex-1 flex items-center justify-center"
      >
        <View>
          <MaterialCommunityIcons name="note-text" size={24} color="black" />
        </View>
      </Pressable>
    </View>
  );
};

export default Navigation;
