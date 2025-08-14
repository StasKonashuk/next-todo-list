import { ActionIcon, ActionIconProps } from '@mantine/core';
// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { FaTrash } from 'react-icons/fa';

const meta = {
  component: ActionIcon,
  args: {
    children: <FaTrash color="red" />,
    size: 'md',
    loading: false,
  },
  argTypes: {
    size: {
      options: ['md', 'sm'],
      control: { type: 'radio' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof ActionIcon>;

export default meta;

type Story = StoryObj<ActionIconProps>;

export const Basic: Story = {};
