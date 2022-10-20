import { View, Text, FlatList, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import Wrapper from './../Custom/Wrapper';
import { GetRealtimeAssignments } from './../../Firebase/assignmentApi';
import AssignmentItem from './AssignmentItem';

const AssignmentMain = () => {
  const { data } = GetRealtimeAssignments();

  const renderItem = ({ item }) => <AssignmentItem assignment={item} />;

  return (
    <Wrapper>
      <View className="flex flex-col justify-center">
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          className="px-4"
        />
      </View>
    </Wrapper>
  );
};

export default AssignmentMain;
