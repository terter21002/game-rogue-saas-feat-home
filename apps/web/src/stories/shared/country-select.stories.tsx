import { TCountryCode } from '@repo/types';
import type { Meta, StoryObj } from '@storybook/react';
import CountrySelectComponent from '@ui/components/shared/country-select';

const meta: Meta<typeof CountrySelectComponent> = {
  title: '@repo-ui-components/shared/country-select',
  component: CountrySelectComponent,
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

type Story = StoryObj<typeof CountrySelectComponent>;

export const Primary: Story = {
  args: {
    val: TCountryCode.US,
  },
  parameters: {
    controls: { expanded: true },
  },
};
