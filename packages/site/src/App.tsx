import "./App.css";
import reactLogo from "./assets/react.svg";
import statechannelsLogo from "./assets/statechannels.svg";
import { NetworkBalance } from "./components/NetworkBalance";
import viteLogo from "/vite.svg";

function App() {
  let total = BigInt(200);
  let mine = BigInt(200);

  setInterval(() => {
    if (mine > BigInt(0)) {
      mine -= BigInt(1);
    }
  }, 1000);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="http://statechannels.org" className="href">
          <img src={statechannelsLogo} className="logo" />
        </a>
      </div>
      <h1>Vite + React + StateChannels</h1>
      <div className="card">
        <NetworkBalance
          status="running"
          lockedBalances={[]}
          myBalanceFree={mine}
          theirBalanceFree={total - mine}
        ></NetworkBalance>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
