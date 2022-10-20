import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const LineupSong = ({ song }) => {
  return (
    <View className="flex flex-row gap-x-2 mt-4">
      <View className="flex-1">
        <Text>{song.song || song.title}</Text>
        <Text className="text-sm text-black/30">{song.label}</Text>
      </View>
      <View className="flex flex-row gap-x-2">
        <Pressable onPress={() => console.log('SHOW LYRICS')}>
          <MaterialCommunityIcons
            name="playlist-music"
            size={24}
            color="skyblue"
          />
        </Pressable>
        <Pressable onPress={() => console.log('SHOW CHORDS')}>
          <MaterialCommunityIcons name="music" size={24} color="orange" />
        </Pressable>
      </View>
    </View>
  );
};

export default LineupSong;
