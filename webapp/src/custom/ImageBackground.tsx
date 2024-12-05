import React, {ReactNode} from 'react';

type Props = {
  imageUrl?: string;
  onClick?: () => void;
  children?: ReactNode;
  style?: React.CSSProperties;
};

export const ImageBackground: React.FC<Props> = ({
  style,
  onClick,
  imageUrl,
  children,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
