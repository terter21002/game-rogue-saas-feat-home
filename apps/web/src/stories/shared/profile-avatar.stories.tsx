import type { Meta, StoryObj } from '@storybook/react';
import ProfileAvatarComponent from '@ui/components/shared/profile-avatar';

const meta: Meta<typeof ProfileAvatarComponent> = {
  title: '@repo-ui-components/shared/profile-avatar',
  component: ProfileAvatarComponent,
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

type Story = StoryObj<typeof ProfileAvatarComponent>;

export const Primary: Story = {
  args: {
    name: 'John Doe',
  },
  parameters: {
    controls: { expanded: true },
  },
};
