import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { ScrollView, View } from 'react-native';
import Header from '../../components/header/Header';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import BottomNavigation from '../../components/navigation/BottomNavigation';
import { Card } from '../../components/card/Card';
import React from 'react';

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

const DetailDiseasePlantScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} />
        <Spacer space={10} />
        {/*캡처 이미지 들어갈 공간*/}
        <Spacer space={300} />
        <Container>
          <Typo.BODY1_M>plant - disease</Typo.BODY1_M>
        </Container>
        <Spacer space={20} />
        {/*상세내용*/}
        <Container>
          <Typo.BODY3_M>environment</Typo.BODY3_M>
          <Card backgroundColor={Color.GRAY100} width={widthPercent * 300}>
            <TextContainer>원인이 들어갑니다.</TextContainer>
          </Card>
          <Spacer space={15} />

          <Typo.BODY3_M>content</Typo.BODY3_M>
          <Card backgroundColor={Color.GRAY100} width={widthPercent * 300}>
            <TextContainer>증상이 들어갑니다.</TextContainer>
          </Card>
          <Spacer space={15} />

          <Typo.BODY3_M>protect</Typo.BODY3_M>
          <Card backgroundColor={Color.GRAY100} width={widthPercent * 300}>
            {/*베이직이면 이렇게*/}
            <TextContainer>방제 대책이 들어갑니다.</TextContainer>
            {/* 베이직이 아니라 여러개의 리스트면 map 사용해서 출력*/}
          </Card>
        </Container>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

export default DetailDiseasePlantScreen;