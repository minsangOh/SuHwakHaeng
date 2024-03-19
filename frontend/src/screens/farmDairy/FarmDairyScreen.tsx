import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Color from '../../config/color/Color';
import Header from '../../components/header/Header';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { useState } from 'react';
import FarmDairy from './component/FarmDairy';
import FarmLedger from './component/FarmLedger';

const FarmDairyScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const Data = [
    { content: '영농일지', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '영농장부', event: () => setActiveIndex(1), active: activeIndex === 1 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type='default' firstIcon='back' title='영농일지/장부'></Header>
        <CustomRadioButton data = { Data }/>
        {activeIndex === 0 && (
          <FarmDairy data={[]}></FarmDairy>
        )}
        {activeIndex === 1 && (
          <FarmLedger data={[]}></FarmLedger>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FarmDairyScreen;
