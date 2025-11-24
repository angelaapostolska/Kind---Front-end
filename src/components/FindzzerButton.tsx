import * as React from 'react';
import { Button, ButtonProps } from 'react-native-paper';
import { typography } from '@/constants/theme/typography';

type FindzzerButtonProps = Omit<ButtonProps, 'children'> & {
  children: React.ReactNode;
};

const FindzzerButton: React.FC<FindzzerButtonProps> = ({ children, mode = 'contained', style, labelStyle, ...rest }) => {
  return (
    <Button
      mode={mode}
      labelStyle={{
        fontWeight: typography.fontVariants.system.medium,
        fontSize: typography.fontSize.heading.xs,
        padding: 1,
      }}
      contentStyle={{ height: 45 }}
      style={[{ borderRadius: 8 }, style]}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default FindzzerButton;
