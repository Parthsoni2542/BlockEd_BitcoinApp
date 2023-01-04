import React from 'react';
import { View, Text, Image } from 'react-native';
import Constants from '../common/Constants.json';
import Styles from '../common/Styles';

function RadioButton(props) {

    return (
        <View style={{ flexDirection: 'row', flex: 1, marginTop: 20, }}>
            {
                props.icon != null
                &&
                <Image width="20%" height="20%" source={props.icon} />
            }
            {
                props.text != '' &&
                <Text style={{ ...Styles.labelTextStyleBlack, flex: 0.5,marginStart:20, }}>{props.text}</Text>
            }
            <View style={{ flex: 0.5, }}>
                <View style={[{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#000000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf:'flex-end',

                }, props.style]}>
                    {
                        props.selected  ?
                            <View style={{
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: props.selectedColor != '' ? props.selectedColor : Constants.AppColors.LightMode.SocialAuthButtonBackgroundColor  ,
                            
                            }} />
                            : null
                    }
                </View>
            </View>
        </View>
    );
}

export default RadioButton;