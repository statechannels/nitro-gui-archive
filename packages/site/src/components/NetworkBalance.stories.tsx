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
  status: 'running',
  lockedBalances: [],
});

export const EvenStart = Template.bind(this, {
  myBalanceFree: 10n ** 18n,
  theirBalanceFree: 10n ** 18n,
  status: 'running',
  lockedBalances: [],
});

export const ClientStart = Template.bind(this, {
  myBalanceFree: 100n,
  theirBalanceFree: 0n,
  status: 'running',
  lockedBalances: [],
});

export const ClientMid = Template.bind(this, {
  myBalanceFree: 70n,
  theirBalanceFree: 10n,
  status: 'running',
  lockedBalances: [],
});

export const ProviderStart = Template.bind(this, {
  myBalanceFree: 0n,
  theirBalanceFree: 100n,
  status: 'running',
  lockedBalances: [],
});

export const ProviderMid = Template.bind(this, {
  myBalanceFree: 15n,
  theirBalanceFree: 60n,
  status: 'running',
  lockedBalances: [],
});

export const TwoChannels = Template.bind(this, {
  myBalanceFree: 47n,
  theirBalanceFree: 100n,
  status: 'running',
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

export const SomeChannels = Template.bind(this, {
  myBalanceFree: 50n,
  theirBalanceFree: 100n,
  status: 'running',
  lockedBalances: randomChannels(5, 100n),
});

export const ManyChannels = Template.bind(this, {
  myBalanceFree: 345n,
  theirBalanceFree: 123n,
  status: 'running',
  lockedBalances: randomChannels(15, 150n),
});

export const UnresponsivePeer = Template.bind(this, {
  myBalanceFree: 25n,
  theirBalanceFree: 65n,
  status: 'unresponsive-peer',
  lockedBalances: randomChannels(5, 100n),
});

export const UnderChallenge = Template.bind(this, {
  myBalanceFree: 83n,
  theirBalanceFree: 24n,
  status: 'under-challenge',
  lockedBalances: randomChannels(5, 100n),
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
