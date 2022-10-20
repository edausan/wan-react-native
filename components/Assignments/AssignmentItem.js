import { View, Text } from 'react-native';
import React from 'react';
import UserCardDetails from './../Custom/UserCardDetails';
import Card from '../Custom/Card';
import AssignmentData from './AssignmentData';

const AssignmentItem = ({ assignment }) => {
  return (
    <Card>
      <UserCardDetails data={assignment} user={assignment.created_by} />
      <View className="relative">
        <AssignmentData
          data={assignment.belleview}
          service="Worship Service | Belleview"
        />
        {assignment.lumina.wl ||
          (assignment.lumina.backups.length > 0 && (
            <AssignmentData
              data={assignment.lumina}
              service="Worship Service | Lumina"
            />
          ))}
        <AssignmentData data={assignment.youth} service="Youth Service" />
      </View>
    </Card>
  );
};

export default AssignmentItem;
