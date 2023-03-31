import bigDecimal from 'js-big-decimal';
import { PieChart } from 'react-minimal-pie-chart';
import {
  LinearProgress,
  Box,
  Typography,
  LinearProgressProps,
} from '@material-ui/core';
import { prettyPrintWei } from './utils';
import './NetworkBalance.scss';
import styles from './_variables.scss';

// This prevents a runtime error in storybook
// @ts-ignore
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

export type NetworkBalanceProps = {
  myBalanceFree: bigint;
  myBalanceLocked: bigint;
  theirBalanceFree: bigint;
  theirBalanceLocked: bigint;
};

function percentageOfTotal(quantity: bigint, total: bigint): number {
  return parseFloat(bigDecimal.divide(quantity, total, 8)) * 100;
}

export const NetworkBalance: React.FC<NetworkBalanceProps> = (props) => {
  const {
    myBalanceFree,
    myBalanceLocked,
    theirBalanceFree,
    theirBalanceLocked,
  } = props;
  const total =
    myBalanceFree + myBalanceLocked + theirBalanceFree + theirBalanceLocked;
  let data = [{ title: '0', value: 100, color: 'red' }];
  let myBalanceFreePercentage,
    myBalanceLockedPercentage,
    theirBalanceFreePercentage,
    theirBalanceLockedPercentage;
  if (total > 0) {
    [
      myBalanceFreePercentage,
      myBalanceLockedPercentage,
      theirBalanceFreePercentage,
      theirBalanceLockedPercentage,
    ] = [
      myBalanceFree,
      myBalanceLocked,
      theirBalanceFree,
      theirBalanceLocked,
    ].map((x) => percentageOfTotal(x, total));

    data = [
      {
        title: prettyPrintWei(myBalanceFree),
        value: myBalanceFreePercentage,
        color: styles.cOrange,
      },
      {
        title: prettyPrintWei(myBalanceLocked),
        value: myBalanceLockedPercentage,
        color: styles.cOrangeLite,
      },

      {
        title: prettyPrintWei(theirBalanceLocked),
        value: theirBalanceLockedPercentage,
        color: styles.cGreyLite,
      },
      {
        title: prettyPrintWei(theirBalanceFree),
        value: theirBalanceFreePercentage,
        color: styles.cGrey,
      },
    ];
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <PieChart
              className="budget-pie-chart"
              animate
              lineWidth={18}
              labelStyle={(index) => ({
                fill: '#ea692b',
                fontSize: '10px',
                fontFamily: 'sans-serif',
              })}
              radius={42}
              data={data}
              label={({ dataEntry }) => prettyPrintWei(myBalanceFree)}
              labelPosition={0}
              segmentsStyle={(idx) => ({ color: 'red' })}
            />
          </td>
          <td className="budget-progress-bars">
            <span>Available receive capacity</span>
            <LinearProgressWithLabel
              variant="determinate"
              value={theirBalanceFreePercentage ?? 0}
              label={prettyPrintWei(theirBalanceFree)}
              className={'bar their'}
            />
            <span>Locked receive capacity </span>
            <LinearProgressWithLabel
              variant="determinate"
              value={theirBalanceLockedPercentage ?? 0}
              label={prettyPrintWei(theirBalanceLocked)}
              className={'bar locked-their'}
            />
            <span>Locked spend capacity </span>
            <LinearProgressWithLabel
              variant="determinate"
              value={myBalanceLockedPercentage ?? 0}
              label={prettyPrintWei(myBalanceLocked)}
              className={'bar locked-me'}
            />
            <span>Available spend capacity</span>
            <LinearProgressWithLabel
              variant="determinate"
              value={myBalanceFreePercentage ?? 0}
              label={prettyPrintWei(myBalanceFree)}
              className={'bar me'}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number; label: string },
) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={100} maxWidth={100}>
        <Typography variant="caption" color="textSecondary">
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
}
