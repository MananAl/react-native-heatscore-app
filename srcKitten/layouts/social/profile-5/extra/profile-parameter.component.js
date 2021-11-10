import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Text } from '@ui-kitten/components';

export const ProfileParameter = (props) => {

    const { style, hint, value, ...viewProps } = props;

    return (
        <View
            {...viewProps}
            style={[styles.container, style]}>
            <Text
                category='h6'
                status='control'>
                {value}
            </Text>
            <Text
                status='control'>
                {hint}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});