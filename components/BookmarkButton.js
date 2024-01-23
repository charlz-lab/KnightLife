import React from 'react';
import { View } from 'react-native';
import Icon from './Icon';

const BookmarkButton = ({ active, style }) => {
    return (
        < View
            style={
                [
                    {
                        backgroundColor: 'black',
                        padding: 4,
                        borderRadius: 5,
                        alignSelf: "right"
                    },
                    style,
                ]} >
            {/*changes png when active*/}
            <Icon icon={active ? 'BookmarkFilled' : 'Bookmark'} size={24} />
        </View >
    );
};

export default BookmarkButton;