import { View, Text, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { AppCtx } from '../../App';
import Avatar from '../Custom/Avatar';
import moment from 'moment';

const AssignmentData = ({ data, service }) => {
  const { Users } = useContext(AppCtx);
  const [expand, setExpand] = useState(false);
  const [wl, setWL] = useState(null);
  const [backups, setBackups] = useState([]);

  const handlePress = () => {
    setExpand((prev) => !prev);
  };

  useEffect(() => {
    if (data.wl && Users.length > 0) {
      const wl_data = Users.filter((user) => user.uid === data.wl)[0];

      const backups_data = data.backups.map((b) => {
        const b_data = Users.filter((u) => u.uid === b)[0];
        return b_data;
      });
      setWL(wl_data);
      setBackups(backups_data);
    }
  }, [data, Users]);

  useEffect(() => {
    console.log({ service, backups });
  }, [backups]);

  return (
    <View className="mt-4">
      <Pressable onPress={handlePress}>
        <View className="sticky top-0 left-0">
          <View className="flex flex-row gap-2 items-center ">
            <MaterialIcons name="date-range" size={24} color="black" />
            <View className="flex-1">
              <Text>{service}</Text>
              <Text className="text-sm">
                {moment(data.date).startOf('minute').fromNow()}
              </Text>
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
        {data.wl && (
          <View className="flex flex-col justify-center mt-4 p-2 bg-gray-50 rounded-md">
            <Text className="text-sm mb-2">Worship Leader</Text>
            <View className="flex flex-row items-center">
              <Avatar src={wl?.photoURL} size="lg" />
              <View className="ml-2">
                <Text className="text-lg">{wl?.displayName}</Text>
              </View>
            </View>
          </View>
        )}
        {data.backups.length > 0 && (
          <View className="flex flex-col justify-center mt-2 p-2 bg-gray-50 rounded-md">
            <Text className="text-sm mb-2">Backup</Text>
            {backups.map((backup) => {
              return (
                <View
                  key={backup.uid}
                  className="flex flex-row items-center mb-2"
                >
                  <Avatar src={backup?.photoURL} size="sm" />
                  <View className="ml-2">
                    <Text className="text-lg">{backup?.displayName}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
        {/* {assignment?.songs.map((song) => {
          return <LineupSong key={song.id} song={song} />;
        })} */}
      </View>
    </View>
  );
};

export default AssignmentData;
