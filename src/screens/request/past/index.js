import React from 'react';
import {FlatList} from 'react-native';
import {Block, CustomButton, ImageComponent, Text} from '../../../components';
import {t1, t2, w3} from '../../../components/theme/fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ActivityLoader from '../../../components/activityLoader';
import moment from 'moment';
import EmptyFile from '../../../components/emptyFile';

const PastRequest = () => {
  const navigation = useNavigation();
  const isLoad = useSelector((state) => state.customer.list.loading);
  const data = useSelector((state) => state.customer.list.data);
  const {completed} = data;

  const formatDate = (v) => {
    return moment(v).format('DD, MMM YYYY');
  };
  const formatTime = (v) => {
    return moment(v).format('hh:mm a');
  };

  const _renderItem = ({item}) => {
    return (
      <CustomButton
        onPress={() =>
          navigation.navigate('RequestDetails', {
            item: item,
          })
        }
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
              {item.name}
            </Text>
            <Text margin={[hp(0.5), 0, 0, 0]} grey body>
              Request Id: #{item.id}
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
                {formatTime(item.created_at)}
              </Text>
            </Block>
            <Block margin={[t1, 0]} row center flex={false}>
              <ImageComponent name="calendar_icon" height="14" width="12.25" />
              <Text margin={[0, w3]} grey body>
                {formatDate(item.created_at)}
              </Text>
            </Block>
            <Block margin={[t1, 0]} row center flex={false}>
              <ImageComponent name="location_icon" height="14" width="14" />
              <Text margin={[0, w3]} grey body>
                {item.address}
              </Text>
            </Block>
          </Block>
          <Block flex={false} center middle style={{width: wp(30)}}>
            <Block
              padding={[7]}
              borderRadius={5}
              flex={false}
              color={
                item.status === 'completed' ? 'rgba(87, 185, 86,.3)' : '#F7E5E0'
              }>
              <Text
                transform="uppercase"
                semibold
                color={item.status === 'completed' ? '#39B54A' : '#B92D00'}
                size={12}>
                {item.status === 'completed' ? 'Completed' : item.status}
              </Text>
            </Block>
          </Block>
        </Block>
      </CustomButton>
    );
  };
  return (
    <Block white middle>
      {isLoad && <ActivityLoader />}
      <FlatList
        contentContainerStyle={{paddingBottom: hp(2), flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyFile />}
        data={completed}
        renderItem={_renderItem}
      />
    </Block>
  );
};

export default PastRequest;
