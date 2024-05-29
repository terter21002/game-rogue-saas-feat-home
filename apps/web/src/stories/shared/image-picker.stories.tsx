import type { Meta, StoryObj } from '@storybook/react';
import ImagePicker from '@ui/components/shared/image-picker';

const meta: Meta<typeof ImagePicker> = {
  title: '@repo-ui-components/shared/image-picker',
  component: ImagePicker,
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

type Story = StoryObj<typeof ImagePicker>;

export const Primary: Story = {
  args: {
    onChange(v) {
      console.log(v);
    },
    value: 'https://i.pravatar.cc/300',
  },
  parameters: {
    controls: { expanded: true },
  },
};
