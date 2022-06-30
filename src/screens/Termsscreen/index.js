import React from 'react';
import {ScrollView} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Header from '../../common/header';
import {Block, Text} from '../../components';

const Terms = () => {
  const renderBoldText = (title, val = true) => {
    return (
      <Text bold={val} size={14} margin={[heightPercentageToDP(0.5), 0]}>
        {title}
      </Text>
    );
  };
  return (
    <Block white>
      <Header centerText="Terms and Conditions" />
      <Block padding={[heightPercentageToDP(1), widthPercentageToDP(3)]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text bold size={14}>
            Last updated: September 2021
          </Text>
          <Text size={14} margin={[heightPercentageToDP(0.5), 0]}>
            MyLo Pro is licensed to You (End-User) by MyLo Pro, located at Level
            35, One International Towers, 100 Barangaroo Ave, Sydney NSW 2000
            Australia (hereinafter: Licensor), for use only under the terms of
            this License Agreement.
          </Text>
          {renderBoldText(
            'By downloading the Application from the Apple AppStore or Google Playstore, and any update thereto (as permitted by this License Agreement), You indicate that You agree to be bound by all of the terms and conditions of this License Agreement, and that You accept this License Agreement.',
            false,
          )}
          {renderBoldText(
            'The parties of this License Agreement acknowledge that Apple or Google is not a Party to this License Agreement and is not bound by any provisions or obligations with regard to the Application, such as warranty, liability, maintenance and support thereof. MyLo Pro, not Apple or Google, is solely responsible for the licensed Application and the content thereof.',
            false,
          )}
          {renderBoldText(
            'This License Agreement may not provide for usage rules for the Application that are in conflict with the latest App Store or Play Store Terms of Service. MyLo Pro acknowledges that it had the opportunity to review said terms and this License Agreement is not conflicting with them.',
            false,
          )}
          {renderBoldText(
            'All rights not expressly granted to You are reserved.',
            false,
          )}
          {renderBoldText('1. THE APPLICATION')}
          {renderBoldText(
            'MyLo Pro (hereinafter: Application) is a piece of software created to connect users with mortgage brokers around them - and customized for Apple and Android mobile devices. It is used to enable residents of Sydney to choose mortgage brokers.',
            false,
          )}
          {renderBoldText('2. SCOPE OF LICENSE ')}
          {renderBoldText(
            '2.1  You are given a non-transferable, non-exclusive, non-sublicensable license to install and use the Licensed Application on any Apple or Android Products that You (End-User) own or control and as permitted by the Usage Rules set forth in this section and the App Store or Play Store Terms of Service, with the exception that such licensed Application may be accessed and used by other accounts associated with You (End-User, The Purchaser) via Family Sharing or volume purchasing.',
            false,
          )}
          {renderBoldText(
            '2.2  This license will also govern any updates of the Application provided by Licensor that replace, repair, and/or supplement the first Application, unless a separate license is provided for such update in which case the terms of that new license will govern.',
            false,
          )}
          {renderBoldText(
            '2.3  You may not share or make the Application available to third parties (unless to the degree allowed by the Apple or Google Terms and Conditions, and with MyLo Pro’s prior written consent), sell, rent, lend, lease or otherwise redistribute the Application.',
            false,
          )}
          {renderBoldText(
            '2.4  You may not reverse engineer, translate, disassemble, integrate, decompile, integrate, remove, modify, combine, create derivative works or updates of, adapt, or attempt to derive the source code of the Application, or any part thereof (except with MyLo Pro’s prior written consent).',
            false,
          )}
          {renderBoldText(
            '2.5  You may not copy (excluding when expressly authorized by this license and the Usage Rules) or alter the Application or portions thereof. You may create and store copies only on devices that You own or control for backup keeping under the terms of this license, the App Store or Play Store Terms of Service, and any other terms and conditions that apply to the device or software used. You may not remove any intellectual property notices. You acknowledge that no unauthorized third parties may gain access to these copies at any time.',
            false,
          )}
          {renderBoldText(
            '2.6  Violations of the obligations mentioned above, as well as the attempt of such infringement, may be subject to prosecution and damages.',
            false,
          )}
          {renderBoldText(
            '2.7  Licensor reserves the right to modify the terms and conditions of licensing.',
            false,
          )}
          {renderBoldText(
            '2.8  Nothing in this license should be interpreted to restrict third-party terms. When using the Application, You must ensure that You comply with applicable third-party terms and conditions.',
            false,
          )}
          {renderBoldText('3. TECHNICAL REQUIREMENTS')}
          {renderBoldText(
            '3.1  The Application requires using the latest version of the firmware.',
            false,
          )}
          {renderBoldText(
            '3.2  Licensor attempts to keep the Application updated so that it complies with modified/new versions of the firmware and new hardware. You are not granted rights to claim such an update.',
            false,
          )}
          {renderBoldText(
            '3.3  You acknowledge that it is Your responsibility to confirm and determine that the app end-user device on which You intend to use the Application satisfies the technical  specifications mentioned above.',
            false,
          )}
          {renderBoldText(
            '3.4  Licensor reserves the right to modify the technical specifications as it sees appropriate at any time.',
            false,
          )}
          {renderBoldText('4. MAINTENANCE AND SUPPORT')}
          {renderBoldText(
            '4.1  The Licensor is solely responsible for providing any maintenance and support services for this licensed Application. You can reach the Licensor at the email address listed in the App Store or Play Store Overview for this licensed Application.',
            false,
          )}
          {renderBoldText(
            '4.2  MyLo Pro and the End-User acknowledge that Apple or Google has no obligation whatsoever to furnish any maintenance and support services with respect to the licensed Application.',
            false,
          )}
          {renderBoldText('5. USE OF DATA')}
          {renderBoldText(
            'You acknowledge that Licensor will be able to access and adjust Your downloaded licensed Application content and Your personal information, and that Licensor’s use of such material and information is subject to Your legal agreements with Licensor and Licensor’s privacy policy.',
            false,
          )}
          {renderBoldText('6. CONTRIBUTION LICENSE')}
          {renderBoldText(
            'By posting your Contributions to any part of the Application or making Contributions accessible to the Application by linking your account from the Application to any of your social networking accounts, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and license to host, use copy, reproduce, disclose, sell, resell, publish, broad cast, retitle, archive, store, cache, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial advertising, or otherwise, and to prepare derivative works of, or incorporate in other works, such as Contributions, and grant and authorizesub-licenses of the foregoing. The use and distribution may occur in any media formats and through any media channels.',
            false,
          )}
          {renderBoldText(
            'This license will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.',
            false,
          )}
          {renderBoldText(
            'We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area in the Application. You are solely responsible for your Contributions to the Application and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.',
            false,
          )}
          {renderBoldText(
            'We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations in the Application; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.',
            false,
          )}
          {renderBoldText('7. WARRANTY')}
          {renderBoldText(
            '7.1  Licensor warrants that the Application is free of spyware, trojan horses, viruses, or any other malware at the time of Your download. Licensor warrants that the Application works as described in the user documentation.',
            false,
          )}
          {renderBoldText(
            '7.2  No warranty is provided for the Application that is not executable on the device, that has been unauthorizedly modified, handled inappropriately or culpably, combined or installed with inappropriate hardware or software, used with inappropriate accessories, regardless if by Yourself or by third parties, or if there are any other reasons outside of MyLo Pro’s sphere of influence that affect the executability of the Application.',
            false,
          )}
          {renderBoldText(
            '7.3  You are required to inspect the Application immediately after installing it and notify MyLo Pro about issues discovered without delay by e-mail info@mylopro.com.au. The defect report will be taken into consideration and further investigated if it has been mailed within a period of thirty (30) days after discovery.',
            false,
          )}
          {renderBoldText(
            '7.4  If we confirm that the Application is defective, MyLo Pro reserves a choice to remedy the situation either by means of solving the defect or substitute delivery.',
            false,
          )}
          {renderBoldText('8. CONTACT INFORMATION')}
          {renderBoldText(
            'For general inquiries, complaints, questions or claims concerning the licensed Application, please contact:     ',
            false,
          )}
          {renderBoldText(
            'Support Team at Level 35, One International Towers, 100 Barangaroo Ave, Sydney NSW 2000 Australia or email atinfo@mylopro.com.au',
            false,
          )}
          {renderBoldText('9. TERMINATION')}
          {renderBoldText(
            'The license is valid until terminated by MyLoPro or by You. Your rights under this license will terminate automatically and without notice from MyLo Pro if You fail to adhere to any term(s) of this license. Upon License termination, You shall stop all use of the Application, and destroy all copies, full or partial, of the Application',
            false,
          )}
          {renderBoldText(
            '10. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY',
          )}
          {renderBoldText(
            'MyLo Pro represents and warrants that MyLo Pro will comply with applicable third-party terms of agreement when using licensed Application.',
            false,
          )}
          {renderBoldText('11. APPLICABLE LAW')}
          {renderBoldText(
            'This license agreement is governed by the laws of Australia excluding its conflicts of law rules.',
            false,
          )}
          {renderBoldText('12. MISCELLANEOUS')}
          {renderBoldText(
            '12.1  If any of the terms of this agreement should be or become invalid, the validity of the remaining provisions shall not be affected. Invalid terms will be replaced by valid ones formulated in a way that will achieve the primary purpose.             ',
            false,
          )}
          {renderBoldText(
            '12.2  Collateral agreements, changes and amendments are only valid if laid down in writing. The preceding clause can only be waived in writing.   ',
            false,
          )}
        </ScrollView>
      </Block>
    </Block>
  );
};

export default Terms;
