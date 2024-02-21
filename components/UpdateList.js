import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const UpdateList = ({ updateEvents }) => {
    return (
        <Card>
            <FlatList
                data={updateEvents}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.updateEventContainer}>

                        <View style={styles.textContainer}>
                            <Text style={styles.creatorName}>{item.creatorName}</Text>
                            <Text style={styles.dateTime}>{item.dateTime}</Text>
                        </View>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                )}
            />
        </Card>
    );
};

const styles = StyleSheet.create({
    updateEventContainer: {
        paddingBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white'
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 8,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginTop: 10
    },
    creatorName: {
        fontSize: 18,
        fontFamily: "IBMPlexSans-Medium",
        fontWeight: 'bold',
        marginBottom: 8,
    },
    dateTime: {
        fontSize: 12,
        marginBottom: 8,
        fontFamily: "IBMPlexSans-Medium",
    },
    description: {
        fontSize: 14,
    },
});
export default UpdateList