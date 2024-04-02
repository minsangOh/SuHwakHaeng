import { TouchableOpacity, View } from 'react-native';
import { BODY4_M, Detail1_M } from '../typography/Typography';
import { UriImageLoader } from '../image/ImageLoader';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { Spacer } from '../basic/Spacer';
import Hyperlink from 'react-native-hyperlink';
import { openURL } from '../../util/LinkUtil';
import { useState } from 'react';

interface NewsItemProps {
  uri: string;
  title: string;
  content: string;
  company: string;
  date: string;
  href: string;
}

export const NewsItemCard = (props: NewsItemProps) => {
  return (
    <Hyperlink>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => openURL(props.href)}
      >
        <View style={{ height: 'auto', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          <BODY4_M>{props.title}</BODY4_M>
          <Spacer space={heightPercent * 4} />
          <Detail1_M numberOfLines={3}>{props.content}</Detail1_M>
          <Spacer space={heightPercent * 4} />
          <Detail1_M color=''>{`${props.company} · ${props.date}`}</Detail1_M>
        </View>
        <Spacer space={widthPercent * 8} horizontal />
        {props.uri && <UriImageLoader uri={props.uri} style={{ width: widthPercent * 50, aspectRatio: 1 / 1, borderRadius: widthPercent * 12 }} />}
      </TouchableOpacity>
    </Hyperlink>
  );
};
