import { View, Text, Button, TouchableHighlight } from 'react-native';
import React from 'react';
import Avatar from './Avatar';
import { SAMPLE_AVATAR } from '../Constants';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';

const UserCardDetails = ({ data, user }) => {
  const onPress = () => {};
  return (
    <View className="flex flex-row items-center justify-start gap-2  p-1">
      <Avatar src={user?.photoURL} size="sm" />
      <View className="flex flex-col flex-1 translate-y-[-5px]">
        <Text className="text-lg">{user?.displayName}</Text>
        <Text className="text-sm text-gray-500">
          {moment(data.date_created).startOf('minute').fromNow()}{' '}
          {data.date_updated && (
            <Text className="text-gray-400">
              • Edited: {moment(data.date_updated).startOf('minute').fromNow()}
            </Text>
          )}
        </Text>
      </View>
      <TouchableHighlight onPress={onPress}>
        <View className="bg-white">
          <Feather name="more-vertical" size={24} color="black" />
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default UserCardDetails;
