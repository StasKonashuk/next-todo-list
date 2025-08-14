import { PasswordInput, PasswordInputProps } from '@mantine/core';
// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: PasswordInput,
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      options: ['md', 'sm', 'lg'],
      control: { type: 'radio' },
    },
    value: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<PasswordInputProps>;

export const Basic: Story = {};
