import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

/**
 * @param size sm | lg
 */

const Avatar = ({ src, size }) => {
  const [avatarSize, setAvatarSize] = useState(36);

  useEffect(() => {
    switch (size) {
      case 'sm':
        setAvatarSize(36);
        break;
      case 'lg':
        setAvatarSize(40);
        break;

      default:
        setAvatarSize(36);
        break;
    }
  }, [size]);

  return (
    <View
      className={`w-[36px] h-[36px] rounded-full overflow-hidden bg-red-500`}
    >
      {src && (
        <Image
          className={`w-[36px] h-[36px]`}
          source={{
            uri: src,
          }}
        />
      )}
    </View>
  );
};

export default Avatar;
