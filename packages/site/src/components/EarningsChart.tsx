import React from 'react';
import * as bar from '@nivo/bar';
import AxisProps from '@nivo/axes/dist/types';
import { address, getToken } from '../utils/tokens';

export type StampedEarning = {
  time: Date;
  token: address;
  amount: bigint;
};

export type EarningsChartProps = {
  earnings: StampedEarning[];
  timeScale: 'day' | 'week' | 'month' | number; // number is in days
};

type Bucket = {
  startTime: Date;
  endTime: Date;
  label: string;
  earnings: { [x: address]: bigint };
};

function getBuckets(timeScale: EarningsChartProps['timeScale']): Bucket[] {
  const now = new Date();
  const buckets: Bucket[] = [];

  if (timeScale === 'day') {
    for (let i = 24; i > 0; i--) {
      buckets.push({
        startTime: new Date(now.getTime() - i * 60 * 60 * 1000),
        endTime: new Date(now.getTime() - (i - 1) * 60 * 60 * 1000),
        label: `${i - 1}`,
        earnings: {},
      });
    }
  }

  if (timeScale === 'week') {
    for (let i = 7; i > 0; i--) {
      buckets.push({
        startTime: new Date(now.getTime() - i * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() - (i - 1) * 24 * 60 * 60 * 1000),
        label: `${i - 1}`,
        earnings: {},
      });
    }
  }

  if (timeScale === 'month') {
    for (let i = 30; i > 0; i--) {
      buckets.push({
        startTime: new Date(now.getTime() - i * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() - (i - 1) * 24 * 60 * 60 * 1000),
        label: `${i - 1}`,
        earnings: {},
      });
    }
  }

  return buckets;
}

function fillBuckets(buckets: Bucket[], earnings: StampedEarning[]): Bucket[] {
  const tokens = getTokenList(earnings);

  for (const bucket of buckets) {
    for (const token of tokens) {
      bucket.earnings[token] = 0n;
    }
  }

  for (const earning of earnings) {
    for (const bucket of buckets) {
      if (earning.time > bucket.startTime && earning.time < bucket.endTime) {
        bucket.earnings[earning.token] += earning.amount;
      }
    }
  }

  return buckets;
}

function getTokenList(earnings: StampedEarning[]): address[] {
  const tokens = new Set<address>();
  earnings.forEach((x) => tokens.add(x.token));
  return Array.from(tokens);
}

/**
 * Converts 'filled' time buckets to data for nivo bar chart.
 *
 * @param buckets - Filled time buckets.
 * @returns Formatted data for nivo bar chart.
 */
function getChartData(buckets: Bucket[]): bar.BarDatum[] {
  const data: bar.BarDatum[] = [];

  for (const bucket of buckets) {
    const datum: bar.BarDatum = {
      id: bucket.label,
    };
    for (const token of Object.keys(bucket.earnings)) {
      datum[token] = Number(bucket.earnings[token]);
    }
    data.push(datum);
  }
  return data;
}

export const EarningsChart: React.FC<EarningsChartProps> = (props) => {
  const { earnings, timeScale } = props;
  const timeBuckets = getBuckets(timeScale);
  fillBuckets(timeBuckets, earnings);

  const data: bar.BarDatum[] = getChartData(timeBuckets);

  return (
    <div style={{ height: 400, width: 600 }}>
      <bar.ResponsiveBar
        data={data}
        keys={getTokenList(earnings)}
        indexBy={'id'}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Time',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Earnings',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        ariaLabel="Earnings"
        barAriaLabel={function (e: any) {
          return `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`;
        }}
      />
    </div>
  );
};
