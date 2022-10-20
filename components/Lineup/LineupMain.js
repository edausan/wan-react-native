import { View, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import LineupItem from './LineupItem';
import { RealtimeLineups } from './../../Firebase/songsApi';

const LineupMain = () => {
  const { data } = RealtimeLineups();

  const renderItem = ({ item }) => <LineupItem lineup={item} />;

  return (
    <View className="flex flex-col justify-center">
      <FlatList
        data={data.sort(
          (a, b) => new Date(b.date_created) - new Date(a.date_created)
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="px-4"
      />
    </View>
  );
};

export default LineupMain;
