import Noise from './Noise';
import ParticleCanvas from './Gradation';
import { BrowserView, MobileView  } from "react-device-detect";

export default function App() {
  return (
    <>
    <div className="App">
      <MobileView>
        <img src="https://raw.githubusercontent.com/twitter/twemoji/8e58ae4745075d4faa5b9190eab578aa7e4c32d5/svg/1f622.svg" alt="Crying Face" className='crying-face'/>
        <p>Sorry, this site is not available on mobile devices.</p>
      </MobileView>
      <BrowserView>
          <Noise />
          <ParticleCanvas />
      </BrowserView>
      </div>
    </>
  );
}