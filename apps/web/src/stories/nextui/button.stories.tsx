import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@ui/components/nextui/button';

const meta: Meta<typeof Button> = {
  title: '@repo-ui-components/nextui/button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'auto',
          margin: 'auto',
        }}
      >
        <div>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    children: 'Primary Button',
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Secondary Button',
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Success: Story = {
  args: {
    color: 'success',
    children: 'Success Button',
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Warning: Story = {
  args: {
    color: 'warning',
    children: 'Warning Button',
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Danger: Story = {
  args: {
    color: 'danger',
    children: 'Danger Button',
  },
  parameters: {
    controls: { expanded: true },
  },
};
