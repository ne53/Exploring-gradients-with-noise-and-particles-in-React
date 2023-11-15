import Noise from './components/Noise';
import ParticleCanvas from './components/Gradation';
import { BrowserView, MobileView  } from "react-device-detect";

export default function App() {
  return (
    <>
    <div className="App">
      <MobileView>  
      </MobileView>
      <BrowserView>
          <Noise />
          <ParticleCanvas />
      </BrowserView>
      </div>
    </>
  );
}