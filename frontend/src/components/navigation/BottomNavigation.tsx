import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeActive from '../../../assets/icons/homeActive.svg';
import HomeDefaultIcon from '../../../assets/icons/homeDefault.svg';
import searchActive from '../../../assets/icons/searchActive.svg';
import searchDefault from '../../../assets/icons/searchDefault.svg';
import hospitalActive from '../../../assets/icons/hospitalActive.svg';
import hospitalDefault from '../../../assets/icons/hospitalDefault.svg';
import shopActive from '../../../assets/icons/shopActive.svg';
import shopDefault from '../../../assets/icons/shopDefault.svg';
import profileActive from '../../../assets/icons/profileActive.svg';
import profileDefault from '../../../assets/icons/profileDefault.svg';
import { TabBarView, TabNavigatorStyle } from './BottomNavigationStyle'; // 스타일 파일 경로에 맞게 수정


// 화면 컴포넌트 타입
type RootTabParamList = {
  home: undefined;
  search: undefined;
  hospital: undefined;
  shop: undefined;
  profile: undefined;
};

// 화면 컴포넌트
const HomeScreen = () => <></>;
const DictionaryScreen = () => <></>;
const CropDiagnosisScreen = () => <></>;
const MarketScreen = () => <></>;
const ProfileScreen = () => <></>;

const Tabs = createBottomTabNavigator<RootTabParamList>();

const BottomNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false, // 레이블 표시 x
        headerShown: false, // 헤더 숨김
        tabBarHideOnKeyboard: true, // 키보드 활성 시 탭 숨김
        unmountOnBlur: true, // 다른 탭으로 이동 시 현재 탭 언마운트
        TabNavigatorStyle,
        tabBarIcon: ({ focused }) => {
          // 포커스 상태에 따라 아이콘 변경
          let IconComponent;
          switch (route.name) {
            case 'home':
              IconComponent = focused ? HomeActive : HomeDefaultIcon;
              break;
            case 'search':
              IconComponent = focused ? searchActive : searchDefault;
              break;
            case 'hospital':
              IconComponent = focused ? hospitalActive : hospitalDefault;
              break;
            case 'shop':
              IconComponent = focused ? shopActive : shopDefault;
              break;
            case 'profile':
              IconComponent = focused ? profileActive : profileDefault;
              break;
            default:
              IconComponent = HomeDefaultIcon; // 기본값
              break;
          }
          return (
            <TabBarView>
              <IconComponent />
            </TabBarView>
          );
        },
      })}
    >
      <Tabs.Screen name="home" component={HomeScreen}></Tabs.Screen>
      <Tabs.Screen name="search" component={DictionaryScreen}></Tabs.Screen>
      <Tabs.Screen name="hospital" component={CropDiagnosisScreen}></Tabs.Screen>
      <Tabs.Screen name="shop" component={MarketScreen}></Tabs.Screen>
      <Tabs.Screen name="profile" component={ProfileScreen}></Tabs.Screen>
    </Tabs.Navigator>
  )
    ;
};

export default BottomNavigation;