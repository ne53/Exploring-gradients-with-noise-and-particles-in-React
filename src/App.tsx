import Noise from './Noise';
import ParticleCanvas from './Gradation';
import { isMobile } from "react-device-detect";

export default function App() {
  return (
    <>
      {!isMobile ? (
         <p>Sorry, this app is not available on mobile devices.</p>
      ) : (
        <div className="App">
          <Noise />
          <ParticleCanvas />
        </div>
      )}
    </>
  );
}