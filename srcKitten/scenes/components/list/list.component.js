import React from 'react';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import { ListShowcase } from './list-showcase';
import { listSettings, listShowcase } from './type';
import { ShowcaseContainer } from '../../../components/showcase-container.component';

export const ListScreen = ({ navigation }) => {

    const styles = useStyleSheet(themedStyle);

    const renderItem = (props) => (
        <ListShowcase {...props} style={[props.style, styles.component]} />
    );

    return (
        <ShowcaseContainer
            style={styles.container}
            showcase={listShowcase}
            settings={listSettings}
            renderItem={renderItem}
            onBackPress={navigation.goBack}
        />
    );
};

const themedStyle = StyleService.create({
    container: {
        backgroundColor: 'background-basic-color-2',
    },
    component: {
        // ignore showcase container padding
        marginHorizontal: -24,
    },
});
