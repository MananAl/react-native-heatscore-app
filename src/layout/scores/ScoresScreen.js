import React, { Component, createRef } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Button, TopNavigationAction, TopNavigation, Text } from '@ui-kitten/components';
import { ArrowDownwardIcon, ArrowIosBackIcon, CloseIcon } from '../../libs/icons';
import { TabView, TabBar } from 'react-native-tab-view';
import ScoresPerDayScreen from './ScoresPerDayScreen';
import ScoresLeagueScreen from './ScoresLeagueScreen';
import { format, addDays, subDays } from 'date-fns';
import { Modalize } from 'react-native-modalize';
import FilterLeaguesModal from './components/FilterLeaguesModal';

class ScoresScreen extends Component {
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
            league: null,
            routes: tabs
        }
        this._Mounted = false;
        this.filterModalRef = createRef();
    }

    componentDidMount() {
        this._Mounted = true;
    }

    componentWillUnmount() {
        this._Mounted = false;
    }

    renderScene = ({ route }) => {
        const { league } = this.state;
        const { navigation } = this.props;
        if (league) {
            return (
                <ScoresLeagueScreen
                    date={route.date}
                    navigation={navigation}
                    league={league}
                />
            )
        }
        return (
            <ScoresPerDayScreen
                date={route.date}
                keyDate={route.key}
                setLeague={(league) => this._Mounted && this.setState({ league: league })}
                navigation={navigation} />
        )
    }

    renderTabBar = (props) => (
        <TabBar
            {...props}
            scrollEnabled
            style={{
                backgroundColor: 'black',
                paddingVertical: 0
            }}
            indicatorStyle={{
                backgroundColor: 'white',
                height: 1,
                marginVertical: 0,
            }}
            tabStyle={{
                width: 'auto',
                paddingVertical: 0,
                paddingHorizontal: 2,
                marginVertical: 0,
                minHeight: 30,
            }}
            labelStyle={{
                fontWeight: 'bold',
                fontSize: 12,
                marginVertical: 0,
                paddingVertical: 0
            }}
        />
    )

    goBackAction = () => {
        const { league } = this.state;
        if (league) {
            return (
                <TopNavigationAction
                    icon={ArrowIosBackIcon}
                    onPress={() => this._Mounted && this.setState({ league: null })}
                />
            )
        }
        return null;
    }

    renderTitle = () => {
        const { league } = this.state;
        return <Button style={styles.allScoresButton}
            accessoryRight={league ? null : ArrowDownwardIcon}
            onPress={league ? null : this.onFilterModalOpen}
            size="large">
            <Text numberOfLines={1}>
                {league ? league.name : 'All Scores'}
            </Text>
        </Button>
    }

    onFilterModalOpen = () => {
        this.filterModalRef.current?.open();
    }

    onCloseFilterModal = () => {
        this.filterModalRef.current?.close();
    }

    renderModalHeader = () => {
        return (
            <View style={styles.header}>
                <Text></Text>
                <Text style={styles.titleText}>Select Leagues</Text>
                <TouchableOpacity activeOpacity={0.8}
                    onPress={this.onCloseFilterModal}>
                    <CloseIcon style={styles.closeIcon} />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { index, routes } = this.state;

        return (
            <View style={styles.container} >
                <TopNavigation
                    accessoryLeft={this.goBackAction}
                    title={this.renderTitle}
                />
                <TabView
                    lazy
                    lazyPreloadDistance={1}
                    renderTabBar={this.renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={this.renderScene}
                    onIndexChange={(index) => this._Mounted && this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />
                <Modalize
                    ref={this.filterModalRef}
                    modalStyle={{ backgroundColor: '#000' }}
                    rootStyle={{ borderRadius: 0 }}
                    HeaderComponent={this.renderModalHeader}
                >
                    <FilterLeaguesModal />
                </Modalize>
            </View>
        )
    }
};

export default ScoresScreen;

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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 6,
        backgroundColor: '#111'
    },
    titleText: {
        fontSize: 18
    },
    closeIcon: {
        height: 24,
        width: 24,
        marginHorizontal: 4,
        tintColor: '#FFF',
    },
});
