import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Header from '../../components/header/Header';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import BottomNavigation from '../../components/navigation/BottomNavigation';
import { Divider } from '../../components/basic/Divider';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const DetailPlantResisterScreen = () => {
  const Select = [{ content: '품종1' }, { content: '품종2' }, { content: '품종3' }];

  const onSubmit = () => {
    console.log('검색');
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} title={'작물이름'} />
        <Spacer space={20} />
        {/*품종 선택 안내메시지*/}
        <Container>
          <Typo.BODY2_M>
            작물이름의 <Typo.BODY2_M color={Color.GREEN600}>품종</Typo.BODY2_M>을 선택해주세요
          </Typo.BODY2_M>
        </Container>
        {/*품종선택*/}
        <Container>
          {Select.map((item, index) => (
            <View key={index}>
              <TouchableOpacity onPress={onSubmit}>
                <Spacer space={23} />
                <Typo.BODY3_M>{item.content}</Typo.BODY3_M>
                <Spacer space={23} />
              </TouchableOpacity>
              <Divider marginHorizontal={1} />
            </View>
          ))}
        </Container>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

export default DetailPlantResisterScreen;