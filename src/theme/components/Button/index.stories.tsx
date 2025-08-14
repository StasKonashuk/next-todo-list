import { Button, ButtonProps } from '@mantine/core';
// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Button,
  args: {
    children: 'Label',
    variant: 'primary',
    size: 'md',
    loading: false,
  },
  argTypes: {
    variant: {
      options: ['primary', 'primary-light', 'secondary', 'outlined', 'text', 'destructive', 'destructive-outlined'],
      control: { type: 'radio' },
    },
    size: {
      options: ['md', 'sm', 'lg'],
      control: { type: 'radio' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<ButtonProps>;

export const Basic: Story = {};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const PrimaryLight: Story = {
  args: {
    variant: 'primary-light',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

export const DestructiveOutlined: Story = {
  args: {
    variant: 'destructive-outlined',
  },
};
