import React from 'react';
import {ScrollView} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Header from '../../common/header';
import {Block, Text} from '../../components';

const Privacy = () => {
  const renderBoldText = (title, val = true) => {
    return (
      <Text bold={val} size={14} margin={[heightPercentageToDP(0.5), 0]}>
        {title}
      </Text>
    );
  };

  return (
    <Block white>
      <Header centerText="Privacy Policy" />
      <Block padding={[heightPercentageToDP(1), widthPercentageToDP(3)]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text bold size={14}>
            Last updated: September 2021
          </Text>
          <Text size={14} margin={[heightPercentageToDP(0.5), 0]}>
            Thank you for choosing to be part of our community at MyLo Pro
            ("Company", "we", "us", "our"). We are committed to protecting your
            personal information and your right to privacy. If you have any
            questions or concerns about this privacy notice, or our practices
            with regards to your personal information, please contact us at
            info@mylopro.com.au
          </Text>
          {renderBoldText(
            'When you use our mobile application, as the case may be (the "App") and more generally, use any of our services (the "Services", which include the App), we appreciate that you are trusting us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our  Services immediately.',
            false,
          )}
          {renderBoldText(
            'This privacy notice applies to all information collected through our Services (which, as described above, includes our App), as well as, any related services, sales, marketing or events.',
            false,
          )}
          {renderBoldText(
            'Please read this privacy notice carefully as it will help you understand what we do with the information that we collect.',
          )}
          {renderBoldText('1. WHAT INFORMATION DO WE COLLECT?')}
          {renderBoldText('Personal information you disclose to us', false)}
          {renderBoldText(
            'In Short:  We collect personal information that you provide to us.',
            false,
          )}
          {renderBoldText(
            'We collect personal information that you voluntarily provide to us when you register on the App, express an interest in obtaining information about us or our products and Services, when you participate in activities on the App or otherwise when you contact us.',
            false,
          )}
          {renderBoldText(
            'The personal information that we collect depends on the context of your interactions with us and the App, the choices you make and the products and features you use. The personal information we collect may include the following:',
            false,
          )}
          {renderBoldText(
            'Personal Information Provided by You. We collect names; phone numbers; email addresses; and other similar information.',
            false,
          )}
          {renderBoldText(
            'Social Media Login Data. We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter or other social media account. If you choose to register in this way, we will collect the information described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?" below.',
            false,
          )}
          {renderBoldText(
            'All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.',
            false,
          )}
          {renderBoldText('Information collected through our App', false)}
        </ScrollView>
      </Block>
    </Block>
  );
};

export default Privacy;
