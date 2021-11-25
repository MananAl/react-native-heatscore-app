import React, { PureComponent, createRef } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Button, TopNavigation, Text } from '@ui-kitten/components';
import { TabView, TabBar } from 'react-native-tab-view';
import ScoreCardPerDayScreen from './ScoreCardPerDayScreen';
import { format, addDays, subDays } from 'date-fns';
import { PlusOutlineIcon } from '../../components/icons';
import { Modalize } from 'react-native-modalize';
import AddScoreModalContent from './components/AddScoreModalContent';

class ScoreCardScreen extends PureComponent {
    constructor(props) {
        super(props);

        const tabs = [];
        let today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        today = new Date(year, month, day);

        for (let i = 7; i > 0; i--) {
            const date = subDays(today, i);
            const tab = format(date, "MMM dd");
            tabs.push({ key: tab, title: tab, date: date });
        }
        tabs.push({ key: 'Today', title: 'Today', date: today });
        for (let i = 1; i < 8; i++) {
            const date = addDays(today, i);
            const tab = format(date, "MMM dd");
            tabs.push({ key: tab, title: tab, date: date });
        }

        this.state = {
            index: 7,
            routes: tabs
        }

        this.addModalRef = createRef();
    }

    renderScene = ({ route }) => {
        const { navigation } = this.props;
        return (
            <ScoreCardPerDayScreen
                date={route.date}
                keyDate={route.key}
                setLeague={(league) => this.setState({ league: league })}
                navigation={navigation} />
        )
    }

    renderTabBar = (props) => (
        <TabBar
            {...props}
            scrollEnabled
            style={{ backgroundColor: 'black' }}
            indicatorStyle={{ backgroundColor: 'white' }}
            tabStyle={{ width: 'auto' }}
            labelStyle={{ fontWeight: 'bold' }}
        />
    )

    renderTitle = () => {
        return <View style={styles.allScoresButton}>
            <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16 }}>
                Score Card
            </Text>
        </View>
    }

    addScoreCardAction = () => {
        return (
            <Button style={styles.addScoresButton}
                appearance='ghost'
                status='danger'
                size='medium'
                onPress={() => this.addModalRef.current?.open()}
                accessoryLeft={PlusOutlineIcon} />
        )
    }

    renderModalHeader = () => {
        return (
            <View style={styles.addModalHeader}>
                <TouchableOpacity activeOpacity={0.7}
                    onPress={() => this.addModalRef.current?.close()}>
                    <Text style={styles.modalHeaderAction}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalHeaderTitle}>Add Game</Text>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.modalHeaderAction}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { index, routes } = this.state;

        return (
            <View style={styles.container} >
                <TopNavigation
                    title={this.renderTitle}
                    accessoryRight={this.addScoreCardAction}
                />
                <TabView
                    lazy
                    lazyPreloadDistance={1}
                    renderTabBar={this.renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={this.renderScene}
                    onIndexChange={(index) => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />
                <Modalize
                    ref={this.addModalRef}
                    HeaderComponent={this.renderModalHeader}
                    scrollViewProps={{ showsVerticalScrollIndicator: true }}
                    adjustToContentHeight={true}>
                    <AddScoreModalContent />
                </Modalize>
            </View>
        )
    }
};


export default ScoreCardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    allScoresButton: {
        color: 'white',
        borderRadius: 0,
        borderColor: 0,
        backgroundColor: 'black',
        fontSize: 20,
        maxWidth: '70%',
        alignSelf: 'center',
    },
    addScoresButton: {
        width: 20,
        height: 20,
        alignSelf: 'flex-end'
    },
    addModalHeader: {
        flexDirection: 'row',
        backgroundColor: '#222',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    modalHeaderAction: {
        color: '#E10032',
        fontSize: 14
    },
    modalHeaderTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
});
