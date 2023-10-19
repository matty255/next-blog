import React, { useEffect } from 'react';
import { useLottie } from 'lottie-react';
import toggleSwitchAnimation from '../../../assets/lottie/animation_lntqbth9.json';
import { useRecoilState } from 'recoil';
import { darkModeState } from '@/store/darkModeState';

const ToggleSwitch: React.FC = () => {
  const style = {
    width: 80,
    height: 40,
    minWidth: '54px',
    minHeight: '32px',
  };

  const options = {
    animationData: toggleSwitchAnimation,
    loop: false,
    autoplay: false,
  };

  const { View, animationItem } = useLottie(options, style);
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);

  useEffect(() => {
    if (animationItem) {
      if (darkMode) {
        animationItem.playSegments([60, 300], true);
      } else {
        animationItem.playSegments([100, 0], true);
      }
    }
  }, [darkMode, animationItem]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex ml-2 items-center" onClick={handleToggle}>
      {View}
    </div>
  );
};

export default ToggleSwitch;
