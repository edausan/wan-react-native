import { View, Text } from 'react-native';
import React from 'react';
import Card from './../Custom/Card';
import UserCardDetails from '../Custom/UserCardDetails';
import LineupData from './LineupData';

const LineupItem = ({ lineup }) => {
  return (
    <Card>
      <UserCardDetails data={lineup} user={lineup.worship_leader} />
      <LineupData lineup={lineup} />
    </Card>
  );
};

export default LineupItem;
