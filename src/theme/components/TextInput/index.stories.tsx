import { TextInput, TextInputProps } from '@mantine/core';
// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: TextInput,
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
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<TextInputProps>;

export const Basic: Story = {};
