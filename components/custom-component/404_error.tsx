import Lottie from "lottie-react";
import animationData from '../../assets/animations/404_Error_Lottie_animation.json';

const FourOhFourError = () => {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
    <Lottie 
      animationData={animationData}
      loop
      autoplay
                style={{ width: '60vw', height: '60vh' }}
            />
            </div>
  );
};

export default FourOhFourError;