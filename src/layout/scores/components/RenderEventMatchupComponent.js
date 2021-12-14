import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, RefreshControl } from 'react-native';
import { LoadingIndicator } from './LoadingIndicator';
import { Text } from '@ui-kitten/components';
import { formatDateStr, getMatchScore, getStatusString } from '../../../libs/functions';
import ScoreBoardComponent from './matchup/ScoreBoardComponent';
import GameDetailComponent from './matchup/GameDetailComponent';
import GameEventsComponent from './matchup/GameEventsComponent';
import GameStatsComponent from './matchup/GameStatsComponent';

export default class RenderEventMatchupComponent extends Component {
    renderContent = () => {
        const { event, loading, } = this.props;
        if (loading) {
            return (
                <LoadingIndicator style={styles.loadingIndicator} />
            );
        }
        if (!event) {
            return (
                <Text style={styles.noDataText}>No Data Availale.</Text>
            );
        }
        const { home, away, extra, events, scores, time_status, sport, timer, stats, time } = event;
        const { status_text, status_class } = getStatusString(time_status, timer, sport);
        const { home_score, away_score } = getMatchScore(sport, scores, 'game');
        return (
            <View>
                <View style={styles.mainBoard}>
                    {status_text && <Text style={[styles.statusText, status_class]}>{status_text}</Text>}
                    {!status_text && <Text style={[styles.statusText, styles.upcomingEvent]}>{formatDateStr(time)}</Text>}
                    <View style={styles.mainBoardItem}>
                        <Image
                            style={styles.mainTeamLogoImage}
                            source={{ uri: `https://assets.b365api.com/images/team/b/${home.image_id}.png` }}
                        />
                        <Text style={styles.mainBoardTeamName}>{home.name}</Text>
                        <Text style={styles.mainBoardScore}>{home_score !== '' ? home_score : '-'}</Text>
                    </View>
                    <View style={styles.mainBoardItem}>
                        <Image
                            style={styles.mainTeamLogoImage}
                            source={{ uri: `https://assets.b365api.com/images/team/b/${away.image_id}.png` }}
                        />
                        <Text style={styles.mainBoardTeamName}>{away.name}</Text>
                        <Text style={styles.mainBoardScore}>{away_score !== '' ? away_score : '-'}</Text>
                    </View>
                </View>
                {scores && <ScoreBoardComponent
                    home={home}
                    away={away}
                    scores={scores}
                    sport={sport} />}
                {events && events.length > 0 && <GameEventsComponent
                    home={home}
                    away={away}
                    events={events}
                    sport={sport} />}
                {stats && <GameStatsComponent
                    home={home}
                    away={away}
                    stats={stats}
                    sport={sport} />}
                {extra && <GameDetailComponent
                    home={home}
                    away={away}
                    extra={extra} />}
            </View>
        )
    }
    render() {
        const { refreshing, onRefresh } = this.props;

        return (
            <ScrollView style={styles.container}
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={<RefreshControl
                    colors={['#000']}
                    progressBackgroundColor="#FFF"
                    refreshing={refreshing}
                    onRefresh={onRefresh} />}>
                {this.renderContent()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    loadingIndicator: {
        flex: 1,
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
    mainBoard: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#4445'
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    upcomingEvent: {
        fontSize: 14,
        color: "#999"
    },
    mainBoardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    mainTeamLogoImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    mainBoardTeamName: {
        fontSize: 20,
        marginLeft: 14,
        fontWeight: '500'
    },
    mainBoardScore: {
        fontSize: 30,
        marginLeft: 'auto',
        fontWeight: '800'
    }
});
