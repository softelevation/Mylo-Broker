import React from 'react';
import {Block, ImageComponent, Text} from '../../components';
import Header from '../../common/header';
import {FlatList} from 'react-native';
import {t2, t1, w3, w5} from '../../components/theme/fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
// import { Container } from './styles';

const Notifications = () => {
  const _renderItem = ({item}) => {
    return (
      <>
        {item === 'Message' && (
          <Block
            borderRadius={10}
            shadow
            white
            flex={false}
            margin={[t1, w5]}
            padding={[t2]}>
            <Block flex={false} row>
              <ImageComponent
                name="avatar"
                height="50"
                width="50"
                radius={50}
              />
              <Block margin={[0, w3, 0, w3]}>
                <Text header semibold>
                  Addison
                </Text>
                <Text
                  margin={[heightPercentageToDP(0.5), 0, 0, 0]}
                  grey
                  caption>
                  11:00 • 29/07/2020
                </Text>
                <Text margin={[t1, 0, 0, 0]} grey body>
                  I have arrived at the location. Could you please open the
                  door?
                </Text>
              </Block>
            </Block>
          </Block>
        )}
        {item === 'Accepted' && (
          <Block
            borderRadius={10}
            shadow
            white
            flex={false}
            margin={[t1, w5]}
            padding={[t2]}>
            <Block flex={false} row>
              <Block flex={false} margin={[heightPercentageToDP(0.5), 0]}>
                <ImageComponent name="accepted_icon" height="10" width="10" />
              </Block>
              <Block margin={[0, w3, 0, w3]}>
                <Text secondary body semibold>
                  Booking #1121 accepted
                </Text>
                <Text
                  margin={[heightPercentageToDP(0.5), 0, 0, 0]}
                  grey
                  caption>
                  10:44 • 29/07/2020
                </Text>
                <Text margin={[t1, 0, 0, 0]} grey body>
                  Addison Mccray accepted your request
                </Text>
              </Block>
            </Block>
          </Block>
        )}
        {item === 'Accepted' && (
          <Block
            borderRadius={10}
            shadow
            white
            flex={false}
            margin={[t1, w5]}
            padding={[t2]}>
            <Block baseline flex={false} row>
              <ImageComponent name="rejected_icon" height="13" width="13" />

              <Block margin={[0, w3, 0, w3]}>
                <Text accent body semibold>
                  Booking #1122 rejected
                </Text>
                <Text
                  margin={[heightPercentageToDP(0.5), 0, 0, 0]}
                  grey
                  caption>
                  10:44 • 29/07/2020
                </Text>
                <Text margin={[t1, 0, 0, 0]} grey body>
                  Addison Mccray rejected your request
                </Text>
              </Block>
            </Block>
          </Block>
        )}
      </>
    );
  };
  return (
    <Block white safearea>
      <Header centerText={'Notifications'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: t2}}
        data={[
          'Message',
          'Accepted',
          'Rejected',
          'Message',
          'Accepted',
          'Message',
          'Rejected',
        ]}
        renderItem={_renderItem}
      />
    </Block>
  );
};

export default Notifications;
