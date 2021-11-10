import React from 'react';
import { LayoutGridList, LayoutGridListElement } from '../../components/layout-grid-list.component';
import { data } from './data';

export const EcommerceGridScreen = ({ navigation }) => {

    const onItemPress = (index) => {
        navigation.navigate(data[index].route);
    };

    return (
        <LayoutGridList
            data={data}
            onItemPress={onItemPress}
        />
    );
};
