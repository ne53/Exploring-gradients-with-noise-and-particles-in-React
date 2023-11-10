// import Threejs from './Threejs';
import Noise from './Noise';
import ParticleCanvas from './Gradation';
// import StrobeAnimation  from './StrobeAnimation';

export default function App() {
  return (
    <div className="App"> 
      <ParticleCanvas />
      <Noise />
      {/* <StrobeAnimation /> */}
    </div>
  );
}