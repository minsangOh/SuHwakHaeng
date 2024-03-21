import * as Color from '../../config/color/Color';
import { ScrollView, View } from 'react-native';
import Header from '../../components/header/Header';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import BottomNavigation from '../../components/navigation/BottomNavigation';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const DetailPlantScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} />
        <Spacer space={20} />
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

export default DetailPlantScreen;