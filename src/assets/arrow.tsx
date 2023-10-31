import React from 'react';
import {Svg, Path} from 'react-native-svg';

const Arrow = () => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20">
      <Path
        d="M10 20A10 10 0 1 0 0 10a10 10 0 0 0 10 10zM8.711 4.3l5.7 5.766L8.7 15.711l-1.4-1.422 4.289-4.242-4.3-4.347"
        fill="white" // Puedes cambiar el color si lo deseas
      />
    </Svg>
  );
};

export default Arrow;
