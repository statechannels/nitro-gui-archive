import { Meta, StoryObj } from '@storybook/react';
import { address } from '../utils/tokens';
import {
  EarningsChart,
  EarningsChartProps,
  StampedEarning,
} from './EarningsChart';

const meta: Meta<typeof EarningsChart> = {
  title: 'EarningsChart',
  component: EarningsChart,
  argTypes: {
    timeScale: {
      options: ['day', 'week', 'month'],
      control: {
        type: 'radio',
      },
    },
  },
};

export default meta;

type EC = StoryObj<EarningsChartProps>;

export const NoData: EC = {
  args: {
    timeScale: 'day',
    earnings: [],
  },
};

export const Day: EC = {
  args: {
    timeScale: 'day',
    earnings: randomEarnings(oneDayAgo()),
  },
};

export const Week: EC = {
  args: {
    timeScale: 'week',
    earnings: randomEarnings(oneWeekAgo()),
  },
};

export const Month: EC = {
  args: {
    timeScale: 'month',
    earnings: randomEarnings(oneMonthAgo()),
  },
};

function oneMonthAgo(): Date {
  return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
}

function oneDayAgo(): Date {
  return new Date(Date.now() - 24 * 60 * 60 * 1000);
}

function oneWeekAgo(): Date {
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
}

function randomEarnings(
  since: Date,
  tokens: address[] = ['0x0000000000000000000000000000000000000000'],
): StampedEarning[] {
  const earnings: StampedEarning[] = [];

  for (let i = 0; i < 100; i++) {
    const time = randSince(since);
    const token = tokens[Math.floor(Math.random() * tokens.length)];
    earnings.push({
      time,
      token,
      amount: BigInt(Math.floor(Math.random() * 100)),
    });
  }
  return earnings;
}

/**
 * Generates a random date between the given date and now.
 *
 * @param then - Lower bound for the random date.
 * @returns A date between the given date and now.
 */
function randSince(then: Date): Date {
  const weight = Math.random();
  const epoch = then.getTime() * weight + Date.now() * (1 - weight);
  return new Date(epoch);
}
