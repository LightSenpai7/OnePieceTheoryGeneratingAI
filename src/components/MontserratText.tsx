import React, { FC } from 'react';
import { MontserratTextProps } from '../types/IMontserratTextProps';

const MontserratText: FC<MontserratTextProps> = ({
  uniquifier,
  weight,
  fontSize,
  lineHeight,
  marginBottom,
  children
}) => {
  const className = `montserrat-${uniquifier}`;

  const style: React.CSSProperties = {
    fontFamily: '"Montserrat", serif',
    fontOpticalSizing: 'auto' as React.CSSProperties['fontOpticalSizing'],
    fontWeight: weight,
    fontStyle: 'normal',
    fontSize: fontSize || 'inherit',
    lineHeight: lineHeight || 'normal',
    marginBottom: marginBottom || '0',
  };

  return (
    <>
      <div className={className} style={style}>
        {children}
      </div>
    </>
  );
};

export default MontserratText;
