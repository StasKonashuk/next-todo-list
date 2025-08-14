import { Group, Tooltip } from '@mantine/core';
import { Text } from 'shared/ui';

import classes from './index.module.css';

interface StatusBadgeProps {
  bg: string;
  tooltip: string;
  label: string;
}

const StatusBadge = ({ bg, tooltip, label }: StatusBadgeProps) => (
  <Tooltip label={tooltip}>
    <Group h="100%" bg={bg} wrap="nowrap" className={classes.root}>
      <Text size="small" fw="medium">
        {label}
      </Text>
    </Group>
  </Tooltip>
);

export default StatusBadge;
