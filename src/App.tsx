// import Threejs from './Threejs';
import Noise from './Noise';
import ParticleCanvas from './Gradation';
// import StrobeAnimation  from './StrobeAnimation';
import { isMobile } from "react-device-detect"

export default function App() {
  return (
      <div className="App"> 
       {isMobile ? (
        <div className="empty"></div>
      ) : (
        <Noise />
      )}
        <ParticleCanvas />
      </div>
  );
}