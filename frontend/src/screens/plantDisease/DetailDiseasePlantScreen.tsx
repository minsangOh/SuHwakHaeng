import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { Card } from '../../components/card/Card';
import Header from '../../components/header/Header';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { useRoute } from '@react-navigation/core';

interface ProtectDataBasic {
  basic: string[];
}

interface ProtectDataOther {
  [key: string]: string[];
}

type ProtectData = ProtectDataBasic | ProtectDataOther;

const Container = styled.View`
    margin-left: ${20 * widthPercent}px;
    margin-right: ${20 * widthPercent}px;
    margin-bottom: ${20 * heightPercent}px;
    row-gap: ${5 * heightPercent}px;
`;
const TextContainer = styled.Text`
    margin-left: ${widthPercent * 8}px;
    width: ${widthPercent * 300 - widthPercent * 24}px;
`;

const ImageContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: ${5 * heightPercent}px;
    margin-bottom: ${20 * heightPercent}px;
`;

const DetailDiseasePlantScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailDiseasePlantScreen'>>();
  const diagnosisResult: DiagnosisResult = route.params.diagnosisResult;
  const photo = route.params.photo;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePressBack = () => {
    navigation.navigate('BottomNavigation', { screen: 'DiseasePlantScreen' });
  };

const renderProtectContent = () => {
  // `diagnosisResult.protect?.basic`가 존재하는지 확인
  if (!diagnosisResult.isHealthy && diagnosisResult.protect && diagnosisResult.protect.basic) {
    // `basic` 배열이 존재하는 경우, 내용을 렌더링
    return diagnosisResult.protect.basic.map((item, index) => (
      <TextContainer key={`basic-${index}`}>{item}</TextContainer>
    ));
  } else if (!diagnosisResult.isHealthy) {
    // `basic` 배열이 존재하지 않는 경우, 적절한 대체 메시지나 요소를 렌더링
    return <Typo.BODY3_M>방제 대책 정보가 제공되지 않았습니다.</Typo.BODY3_M>;
  } else {
    // 건강한 경우의 메시지를 렌더링
    return <Typo.BODY3_M>이 식물은 건강합니다.</Typo.BODY3_M>;
  }
};

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}
                  contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        <Header type={'default'} firstIcon={'back'} onPressFirstIcon={handlePressBack} />
        <ImageContainer>
          <Image source={{ uri: photo.uri }} style={{ width: 300, height: 300 }} />
        </ImageContainer>
        <Container>
          <Typo.BODY1_M>
            {diagnosisResult.plant} - {diagnosisResult.isHealthy ? '건강함' : diagnosisResult.disease}
          </Typo.BODY1_M>
        </Container>
        <Spacer space={20} />
        {/* 추가적인 정보 표시 */}
        {!diagnosisResult.isHealthy && (
          <>
            <Container>
              <Typo.BODY3_M>발생 환경</Typo.BODY3_M>
              <Card backgroundColor={Color.GRAY100} width={widthPercent * 300}>
                <TextContainer>{diagnosisResult.environment}</TextContainer>
              </Card>
              <Spacer space={15} />
              <Typo.BODY3_M>주요 증상</Typo.BODY3_M>
              <Card backgroundColor={Color.GRAY100} width={widthPercent * 300}>
                <TextContainer>{diagnosisResult.content}</TextContainer>
              </Card>
              <Spacer space={15} />
              <Typo.BODY3_M>예방 및 방제 대책</Typo.BODY3_M>
              <Card backgroundColor={Color.GRAY100} width={widthPercent * 300}>
                {renderProtectContent()}
              </Card>
            </Container>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailDiseasePlantScreen;
