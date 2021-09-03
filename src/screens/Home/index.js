import React from 'react';
import {Block, Text, ImageComponent, Button} from '../../components';
import {useNavigation} from '@react-navigation/native';
import Header from '../../common/header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {t3, t2} from '../../components/theme/fontsize';
import {ScrollView} from 'react-native';
const Home = () => {
  return (
    <Block flex={1} safearea secondary>
      <Header centerText="" />
      <ScrollView>
        <Block
          flex={false}
          padding={[hp(5), wp(10)]}
          margin={[hp(8), wp(4)]}
          borderRadius={20}
          center
          white>
          <ImageComponent name="search_broker_icon" height="250" width="300" />
          <Text margin={[hp(1), 0]} color="#231F20" bold size={30}>
            Search a broker
          </Text>
          <Text
            height={20}
            margin={[t3, 0, 0, 0]}
            center
            color="#231F20"
            size={14}>
            Start the wizard to find a broker at your desired location.
          </Text>
          <Block margin={[t2, 0, 0, 0]} flex={false}>
            <Button style={{width: wp(80)}} color="primary">
              Start
            </Button>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default Home;
