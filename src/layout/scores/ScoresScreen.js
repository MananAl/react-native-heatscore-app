import React, { Component, createRef } from 'react';
import { StyleSheet, View, Dimensions, BackHandler, Alert, Image } from 'react-native';
import { TopNavigation, Text } from '@ui-kitten/components';
import { TabView, TabBar } from 'react-native-tab-view';
import ScoresPerSportScreen from './ScoresPerSportScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const iconName = {
    "All": "sports",
    "Football": "sports-football",
    "Basketball": "sports-basketball",
    "Hockey": "sports-hockey",
    "Baseball": "sports-baseball",
    "Soccer": "sports-soccer",
}

const logoImages = {
    "NBA": require('../../assets/images/league_logos/nba.png'),
    'NFL': require('../../assets/images/league_logos/nfl.png'),
    'NCAAF': require('../../assets/images/league_logos/ncaaf.png'),
    'CFL': require('../../assets/images/league_logos/cfl.png'),
    'NCAAB': require('../../assets/images/league_logos/ncaab.png'),
    'UEFA CL': require('../../assets/images/league_logos/uefa.png'),
}

const getSportsIcon = (sport, color) => {
    if (iconName[sport]) {
        return (
            <MaterialIcons name={iconName[sport]}
                size={20} color={color ? color : "white"}
            />
        )
    }
    if (logoImages[sport]) {
        return (
            <Image source={logoImages[sport]}
                style={styles.leagueLogoImage}
            />
        )
    }
}

class ScoresScreen extends Component {
    constructor(props) {
        super(props);

        const tabs = [
            { key: null, title: 'All', type: 'sport' },
            { key: 2274, title: 'NBA', type: 'league' },
            { key: 459, title: 'NFL', type: 'league' },
            { key: 474, title: 'NCAAF', type: 'league' },
            { key: 270, title: 'CFL', type: 'league' },
            { key: 2638, title: 'NCAAB', type: 'league' },
            { key: 1040, title: 'UEFA CL', type: 'league' },
            { key: 1, title: 'Soccer', type: 'sport' },
            { key: 12, title: 'Football', type: 'sport' },
            { key: 18, title: 'Basketball', type: 'sport' },
            { key: 17, title: 'Hockey', type: 'sport' },
            { key: 16, title: 'Baseball', type: 'sport' },
        ];
        this.state = {
            index: 0,
            routes: tabs
        }
        this._Mounted = false;
        this.filterModalRef = createRef();
    }

    componentDidMount() {
        this._Mounted = true;
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this._Mounted = false;
        this.backHandler.remove();
    }

    backAction = () => {
        Alert.alert(
            "Close Heatscore",
            "Are you sure you close HeatScore?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        BackHandler.exitApp();
                    },
                },
                { text: "No", },
            ]
        );
        return true;
    };

    renderScene = ({ route }) => {
        const { navigation } = this.props;
        return (
            <ScoresPerSportScreen
                sport={route.type == 'sport' ? route.key : null}
                league={route.type == 'league' ? route.key : null}
                navigation={navigation} />
        )
    }

    renderTabBar = (props) => (
        <View style={styles.tabBarContainer}>
            <TabBar
                {...props}
                scrollEnabled
                style={{
                    backgroundColor: '#121212',
                    paddingVertical: 0,
                }}
                indicatorStyle={{
                    backgroundColor: '#E10032',
                    height: 1,
                    marginVertical: 0,
                }}
                tabStyle={{
                    width: 'auto',
                    paddingVertical: 0,
                    paddingHorizontal: 6,
                    marginVertical: 0,
                    minHeight: 30,
                }}
                labelStyle={{
                    fontWeight: 'bold',
                    fontSize: 12,
                    marginVertical: 0,
                    paddingVertical: 0,
                    marginBottom: 6,
                    textTransform: 'none',
                    backgroundColor: '#121212'
                }}
                activeColor='#E10032'
                inactiveColor='white'
                renderIcon={this.renderIcon}
            />
        </View>
    )

    renderIcon = ({ route, color }) => {
        return getSportsIcon(route.title, color);
    }

    renderTitle = () => {
        return (
            <Text numberOfLines={1} style={styles.headerTitle}>
                All Scores
            </Text>
        )
    }

    onSelectLeague = (league) => {
        this._Mounted && this.setState({ league: league });
        this.filterModalRef.current?.close();
    }

    render() {
        const { index, routes } = this.state;

        return (
            <View style={styles.container} >
                <TopNavigation title={this.renderTitle} style={styles.headerStyle} />
                <TabView
                    lazy
                    renderTabBar={this.renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={this.renderScene}
                    onIndexChange={(index) => this._Mounted && this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />
            </View>
        )
    }
};

export default ScoresScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    headerStyle: {
        paddingBottom: 10,
        paddingTop: 24,
        minHeight: 0,
        backgroundColor: '#121212'
    },
    headerTitle: {
        color: '#888',
        fontSize: 16,
        alignItems: 'center',
        backgroundColor: '#121212',
        marginBottom: 10
    },
    closeIcon: {
        height: 24,
        width: 24,
        marginHorizontal: 4,
        tintColor: '#FFF',
    },
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    leagueLogoImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
});
