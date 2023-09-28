import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

import R from '@utils/res/R';
import colors from '@utils/res/color';
import BackIconSVG from '@utils/res/images/svgs/BackIconSVG';

import IconButton from '@atoms/IconButton';
import Label from '@atoms/Label';

interface HeaderProps {
  title?: string;
  hideBack?: boolean;
  action?: () => void | undefined;
  share?: () => void;
  jumpTo?: () => void;
  hideJump?: boolean;
}
const HeaderBackWithTitle = (props: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View
      style={props?.title?.length > 25 ? styles.longText : styles.container}>
      {!props.hideBack ? (
        <IconButton
          size={'lg'}
          onPress={
            props.action
              ? props.action
              : () => {
                  return navigation.goBack();
                }
          }>
          <BackIconSVG fillColor={colors.light.colorFontSecondary} />
        </IconButton>
      ) : (
        <IconButton size={'lg'}>
          <View />
        </IconButton>
      )}
      <Label
        style={{
          textAlign: 'center',
        }}
        variant={props.title?.length > 25 ? 'title3' : 'title'}
        color={colors.light.colorFontSecondary}
        font={'medium'}>{`${props.title}`}</Label>

      <IconButton size={'lg'} />
      {props.share && (
        <Pressable
          onPress={props.share}
          style={{
            position: 'absolute',
            right: 0,
            top: 50,
          }}>
          <Entypo
            name="share"
            size={30}
            color={colors.light.colorFontSecondary}
            style={{marginRight: 10}}
          />
        </Pressable>
      )}
      {props.hideJump && props.jumpTo && (
        <Pressable
          onPress={props.jumpTo}
          style={{
            position: 'absolute',
            right: 20,
            top: 50,
          }}>
          <Label>Omitir</Label>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: R.unit.scale(90),
    paddingTop: R.unit.scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.light.colorBackground1,
  },
  longText: {
    width: '100%',
    height: R.unit.scale(90),
    paddingTop: R.unit.scale(30),
    paddingRight: R.unit.scale(60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.light.colorBackground1,
  },
});

export default HeaderBackWithTitle;
