import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { BasicButton } from '../../components/button/Buttons';
import { DropDown } from '../../components/dropdown/DropDown';
import Header from '../../components/header/Header';
import { SingleLineInputBox } from '../../components/inputBox/Input';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { useRoute } from '@react-navigation/core';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { useRecoilState } from 'recoil';
import { myCropsList } from '../../recoil/atoms/myCrops';
import { postMyCropInfo } from '../../apis/services/crops/Crops';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  row-gap: ${5 * heightPercent}px;
`;
const ButtonContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

// updateMyCrops를 사용해야하는데 지금 어쩌다보니 안쓰게 됨. 이거 처리해야함

const EnvironmentPlantScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'EnvironmentPlantScreen'>>();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { plantName, cropsVarietyId, varietyName, dataList_S, dataList_D, dataList_G } = route.params;
  const dropDownData = ['평방미터', '평', '헥타르'];
  const [selectData, setSelectData] = useState('평방미터');
  const [cropName, setCropName] = useState('');
  const [area, setArea] = useState('');
  const [cropYield, setCropYield] = useState('');

  const [myCrops, setMyCrops] = useRecoilState(myCropsList);

  const updateMyCrops = () => {
    const keyNumber = Object.keys(myCrops).length;
    const newCrop = { ...myCrops, [keyNumber]: { plantName: plantName, varietyName: varietyName } };
    setMyCrops(newCrop);
  };

  const moveSetLocation = (value: number) => {
    if (!varietyName) return;
    const params = { value, plantName, varietyName, cropsVarietyId };
    navigation.navigate('SetLocationScreen', params);
  };

  const submitCropInfo = async () => {
    console.log('작성완료버튼 클릭1');
    const cropInfo = {
      cropsVarietyId: cropsVarietyId,
      name: cropName,
      area: parseFloat(area),
      areaUnit: selectData,
      yield: parseFloat(cropYield),
      location: {
        sido: dataList_S,
        gugun: dataList_G,
        dong: dataList_D,
      },
    };

    try {
      console.log(cropInfo);
      await postMyCropInfo(cropInfo);
      updateMyCrops();
      navigation.navigate('MyProfileScreen');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} title={plantName} />
        <Spacer space={20} />
        <Container>
          <Typo.BODY2_M>
            <Typo.BODY2_M color={Color.GREEN600}>
              {plantName}({varietyName})
            </Typo.BODY2_M>
            의 재배 정보을 선택해주세요
          </Typo.BODY2_M>
          <Spacer space={20} />
        </Container>
        <Container>
          <Typo.BODY4_M>표시이름 (별칭)</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'표시 이름을 작성해주세요.'} value={cropName} onChangeText={setCropName} />
          <Spacer space={10} />
        </Container>
        <Container>
          <Typo.BODY4_M>지역</Typo.BODY4_M>
          <BasicButton
            onPress={() => {
              moveSetLocation(1);
            }}
            height={heightPercent * 36}
            borderColor={Color.GRAY300}
            backgroundColor={Color.WHITE}
            borderRadius={10}
          >
            <Typo.BODY3_M>
              {dataList_S} {dataList_G} {dataList_D}
            </Typo.BODY3_M>
          </BasicButton>
          <Spacer space={10} />
        </Container>

        <Container>
          <Typo.BODY4_M>재배 면적(선택)</Typo.BODY4_M>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <SingleLineInputBox width={180} placeholder={'재배 면적 입력'} keyboardType='decimal-pad' value={area} onChangeText={setArea} />
            <DropDown width={104} dataList={dropDownData} onSelect={setSelectData} defaultText={'평방미터'} />
          </View>
          <Spacer space={10} />
        </Container>
        <Container>
          <Typo.BODY4_M>수확량(선택)</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'수확량 입력 (Kg단위)'} keyboardType='decimal-pad' value={cropYield} onChangeText={setCropYield} />
        </Container>
      </ScrollView>
      <ButtonContainer>
        <BasicButton onPress={submitCropInfo} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
          <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M>
        </BasicButton>
      </ButtonContainer>
    </View>
  );
};
export default EnvironmentPlantScreen;