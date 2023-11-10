import Noise from './Noise';
import ParticleCanvas from './Gradation';
import { BrowserView, MobileView  } from "react-device-detect";

export default function App() {
  return (
    <>
      <MobileView>
         <p>Sorry, this app is not available on mobile devices.</p>
      </MobileView>

      <BrowserView>
        <div className="App">
          <Noise />
          <ParticleCanvas />
        </div>
      </BrowserView>
    </>
  );
}