import React from 'react';
import { StyleSheet } from 'react-native';
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon, BookmarkIcon, BookmarkOutlineIcon } from '../../components/icons';
import ContentView from '../../layouts/ecommerce/product-details-4';

export const ProductDetails4Screen = ({ navigation }) => {

    const [bookmarked, setBookmarked] = React.useState(false);

    const onBookmarkActionPress = () => {
        setBookmarked(!bookmarked);
    };

    const renderBackAction = () => (
        <TopNavigationAction
            icon={ArrowIosBackIcon}
            onPress={navigation.goBack}
        />
    );

    const renderBookmarkAction = () => (
        <TopNavigationAction
            icon={bookmarked ? BookmarkIcon : BookmarkOutlineIcon}
            onPress={onBookmarkActionPress}
        />
    );

    return (
        <SafeAreaLayout
            style={styles.container}
            insets='top'>
            <TopNavigation
                title='Product Details'
                accessoryLeft={renderBackAction}
                accessoryRight={renderBookmarkAction}
            />
            <ContentView />
        </SafeAreaLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});