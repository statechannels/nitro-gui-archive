import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NetworkBalance, NetworkBalanceProps } from './NetworkBalance';

export default {
  title: 'NetworkBalance',
  component: NetworkBalance,
} as ComponentMeta<typeof NetworkBalance>;

const Template: ComponentStory<typeof NetworkBalance> = (
  args: NetworkBalanceProps,
) => <NetworkBalance {...args} />;

export const EvenStart = Template.bind(this,{
    myBalanceFree: 100n,
    myBalanceLocked: 0n,
    hubBalanceFree: 100n,
    hubBalanceLocked: 0n,
  });

export const Mixed = Template.bind(this,{
    myBalanceFree: 47n,
    myBalanceLocked: 5n,
    hubBalanceFree: 100n,
    hubBalanceLocked: 11n,
  },
);

export const ClientStart = Template.bind(this,{
    myBalanceFree: 100n,
    myBalanceLocked: 0n,
    hubBalanceFree: 0n,
    hubBalanceLocked: 0n,
  },
);

export const ClientMid = Template.bind(this,{
    myBalanceFree: 70n,
    myBalanceLocked: 5n,
    hubBalanceFree: 10n,
    hubBalanceLocked: 15n,
  },
);

export const ProviderStart = Template.bind(this,{
    myBalanceFree: 0n,
    myBalanceLocked: 0n,
    hubBalanceFree: 100n,
    hubBalanceLocked: 0n,
  },
);

export const ProviderMid = Template.bind(this,{
    myBalanceFree: 15n,
    myBalanceLocked: 4n,
    hubBalanceFree: 60n,
    hubBalanceLocked: 21n,
  },
);

export const Zeros = Template.bind({
  myBalanceFree: 0n,
  myBalanceLocked: 0n,
  hubBalanceFree: 0n,
  hubBalanceLocked: 0n,
});
