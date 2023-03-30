import bigDecimal from 'js-big-decimal';
import { PieChart, pieChartDefaultProps } from 'react-minimal-pie-chart';
import { prettyPrintWei } from './utils';

// This prevents a runtime error in storybook
// @ts-ignore
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

export type NetworkBalanceProps = {
  myBalanceFree: bigint;
  myBalanceLocked: bigint;
  hubBalanceFree: bigint;
  hubBalanceLocked: bigint;
};

function percentageOfTotal(quantity: bigint, total: bigint): number {
  return parseFloat(bigDecimal.divide(quantity, total, 8)) * 100;
}

export const NetworkBalance: React.FC<NetworkBalanceProps> = (props) => {
  const { myBalanceFree, myBalanceLocked, hubBalanceFree, hubBalanceLocked } =
    props;
  const total =
    myBalanceFree + myBalanceLocked + hubBalanceFree + hubBalanceLocked;
  var data = [{ title: '0', value: 100, color: 'red' }];
  if (total > 0) {
    const [
      myBalanceFreePercentage,
      myBalanceLockedPercentage,
      hubBalanceFreePercentage,
      hubBalanceLockedPercentage,
    ] = [myBalanceFree, myBalanceLocked, hubBalanceFree, hubBalanceLocked].map(
      (x) => percentageOfTotal(x, total),
    );
    data = [
      {
        title: prettyPrintWei(myBalanceFree),
        value: myBalanceFreePercentage,
        color: '#ea692b',
      },
      {
        title: prettyPrintWei(myBalanceLocked),
        value: myBalanceLockedPercentage,
        color: '#ea692b60',
      },

      {
        title: prettyPrintWei(hubBalanceLocked),
        value: hubBalanceLockedPercentage,
        color: '#d5dbe360',
      },
      {
        title: prettyPrintWei(hubBalanceFree),
        value: hubBalanceFreePercentage,
        color: '#d5dbe3',
      },
    ];
  }
  return (
    <PieChart
      className="budget-pie-chart"
      animate
      lineWidth={18}
      labelStyle={(index) => ({
        fill: 'black',
        fontSize: '10px',
        fontFamily: 'sans-serif',
      })}
      radius={42}
      labelPosition={112} // outer labels
      data={data}
    />
  );
};
