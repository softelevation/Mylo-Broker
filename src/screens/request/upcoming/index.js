import React from 'react';
import {FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Block, CustomButton, ImageComponent, Text} from '../../../components';
import {t1, t2, w3, w6} from '../../../components/theme/fontsize';

const UpcomingRequest = () => {
  const _renderItem = ({item}) => {
    return (
      <Block
        white
        margin={[t2, w3, 0, w3]}
        borderRadius={10}
        padding={[t2]}
        flex={false}
        shadow>
        <Block center row flex={false}>
          <ImageComponent name="avatar" height="50" width="50" radius={50} />
          <Block margin={[0, w3]} flex={false}>
            <Text bold size={18}>
              Addison Mccray
            </Text>
            <Text margin={[hp(0.5), 0, 0, 0]} grey body>
              Request Id: #{item} (08 august, 11:11)
            </Text>
          </Block>
        </Block>
        <Block margin={[t1, 0, 0, 0]} flex={false} row>
          <Block
            flex={false}
            borderWidth={[0, 1, 0, 0]}
            borderColorDeafult
            style={{width: wp(60)}}>
            <Block margin={[t1, 0]} row center flex={false}>
              <ImageComponent name="clock_icon" height="13.5" width="13.5" />
              <Text margin={[0, w3]} grey body>
                1:30 pm - 5:00 pm
              </Text>
            </Block>
            <Block margin={[t1, 0]} row center flex={false}>
              <ImageComponent name="calendar_icon" height="14" width="12.25" />
              <Text margin={[0, w3]} grey body>
                Mon, 10 august
              </Text>
            </Block>
            <Block margin={[t1, 0]} row center flex={false}>
              <ImageComponent name="location_icon" height="14" width="14" />
              <Text margin={[0, w3]} grey body>
                1543 Stoney Lonesome Road 17690 PA
              </Text>
            </Block>
          </Block>
          <Block flex={false} center middle style={{width: wp(30)}}>
            <CustomButton
              padding={[t1, w6]}
              borderRadius={20}
              flex={false}
              borderColor={'#39B54A'}
              borderWidth={1}
              color="#39B54A">
              <Text size={14} color="#fff">
                Accept
              </Text>
            </CustomButton>
            <CustomButton
              padding={[t1, w6]}
              borderRadius={20}
              margin={[t2, 0]}
              flex={false}
              borderColor={'#B92D00'}
              borderWidth={1}
              color="#fff">
              <Text size={14} color="#B92D00">
                Reject
              </Text>
            </CustomButton>
          </Block>
        </Block>
      </Block>
    );
  };
  return (
    <Block white middle>
      <FlatList
        data={['1', '2']}
        contentContainerStyle={{paddingBottom: hp(2)}}
        showsVerticalScrollIndicator={false}
        renderItem={_renderItem}
      />
    </Block>
  );
};

export default UpcomingRequest;
