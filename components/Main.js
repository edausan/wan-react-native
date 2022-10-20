import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Card from './Custom/Card';
import LineupMain from './Lineup/LineupMain';

const Main = () => {
  return (
    <View className="w-full flex-1">
      <LineupMain />
      {/* <Drawer /> */}
    </View>
  );
};

export default Main;
