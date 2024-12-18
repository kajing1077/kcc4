import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button Atomic',
  tags: ['autodocs'],
};

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'btn-primary',
    children: 'Button-Primary',
    classNames: 'p-7',
  },
};

export const Success: Story = {
  args: {
    variant: 'btn-success',
    classNames: 'text-bold',
    children: 'Success',
  },
  render: (args) => (
    <Button {...args} style={{ borderRadius: '10px' }}>
      {args.children}
    </Button>
  ),
};

export const Others: Story = {
  args: {
    variant: '',
    classNames: '',
    children: 'OTHER',
  },
  render: (args) => <Button {...args}>{args.children}</Button>,
};

export default meta;
