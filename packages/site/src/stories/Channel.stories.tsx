import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Channel, ChannelProps } from '../components/Channel';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Channel',
  component: Channel,
} as ComponentMeta<typeof Channel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
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
