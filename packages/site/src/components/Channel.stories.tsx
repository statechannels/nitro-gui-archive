import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Channel, ChannelProps } from './Channel';

export default {
  title: 'Channel',
  component: Channel,
} as ComponentMeta<typeof Channel>;

const Template: ComponentStory<typeof Channel> = (args: ChannelProps) => (
  <Channel {...args} />
);

export const Funded = Template.bind({});
Funded.args = {
  funded: true,
};

export const NotFunded = Template.bind({});
NotFunded.args = {
  funded: false,
};
