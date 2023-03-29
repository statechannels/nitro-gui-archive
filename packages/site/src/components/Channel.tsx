export type ChannelProps = {
  funded: boolean;
};

export const Channel = ({ funded = false }: ChannelProps) => {
  if (funded) {
    return <div>Looks good</div>;
  }
  return <div>No funds</div>;
};
