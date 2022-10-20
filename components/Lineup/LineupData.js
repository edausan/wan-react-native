import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import LineupSong from './LineupSong';

const LineupData = ({ lineup }) => {
  const [expand, setExpand] = useState(false);
  const handlePress = () => {
    setExpand((prev) => !prev);
  };
  return (
    <View className="mt-4">
      <Pressable onPress={handlePress}>
        <View>
          <View className="flex flex-row gap-2 items-center">
            <MaterialIcons name="date-range" size={24} color="black" />
            <View className="flex-1">
              <Text>Worship Service | Belleview</Text>
              <Text className="text-sm">October 12, 2022</Text>
            </View>
            {expand ? (
              <Entypo name="chevron-up" size={24} color="black" />
            ) : (
              <Entypo name="chevron-down" size={24} color="black" />
            )}
          </View>
        </View>
      </Pressable>
      <View
        className={`overflow-hidden transition-all duration-200 ${
          expand ? 'max-h-auto' : 'max-h-[0px]'
        }`}
      >
        {lineup?.songs.map((song) => {
          return <LineupSong key={song.id} song={song} />;
        })}
      </View>
    </View>
  );
};

export default LineupData;
