import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NetworkBalance, NetworkBalanceProps, VirtualChannelBalanceProps } from './NetworkBalance';

export default {
  title: 'NetworkBalance',
  component: NetworkBalance,
} as ComponentMeta<typeof NetworkBalance>;

const Template: ComponentStory<typeof NetworkBalance> = (
  args: NetworkBalanceProps,
) => <NetworkBalance {...args} />;

export const Zeros = Template.bind(this, {
  myBalanceFree: 0n,
  theirBalanceFree: 0n,
  lockedBalances: [],
});

export const EvenStart = Template.bind(this, {
  myBalanceFree: 10n ** 18n,
  theirBalanceFree: 10n ** 18n,
  lockedBalances: [],
});

export const ClientStart = Template.bind(this, {
  myBalanceFree: 100n,
  theirBalanceFree: 0n,
  lockedBalances: [],
});

export const ClientMid = Template.bind(this, {
  myBalanceFree: 70n,
  theirBalanceFree: 10n,
  lockedBalances: [],
});

export const ProviderStart = Template.bind(this, {
  myBalanceFree: 0n,
  theirBalanceFree: 100n,
  lockedBalances: [],
});

export const ProviderMid = Template.bind(this, {
  myBalanceFree: 15n,
  theirBalanceFree: 60n,
  lockedBalances: [],
});

export const TwoChannels = Template.bind(this, {
  myBalanceFree: 47n,
  theirBalanceFree: 100n,
  lockedBalances: [
    {
      budget: 10n,
      myPercentage: 0.5,
    },
    {
      budget: 30n,
      myPercentage: 0.2,
    },
  ],
});

const some = randomChannels(5, 100n);

export const SomeChannels = Template.bind(this, {
  myBalanceFree: 50n,
  theirBalanceFree: 100n,
  lockedBalances: some,
});

const many = randomChannels(15, 150n);

export const ManyChannels = Template.bind(this, {
  myBalanceFree: 345n,
  theirBalanceFree: 123n,
  lockedBalances: many,
});

function randomChannels(
  numChannels: number,
  budgetCeiling: bigint,
): VirtualChannelBalanceProps[] {
  const channels = [];
  for (let i = 0; i < numChannels; i++) {
    channels.push(randomChannel(budgetCeiling));
  }
  return channels;
}

function randomChannel(budgetCeiling: bigint): VirtualChannelBalanceProps {
  return {
    budget: BigInt(Math.floor(Math.random() * Number(budgetCeiling))),
    myPercentage: Math.random(),
  };
}
