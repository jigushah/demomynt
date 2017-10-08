import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import cs from '../constants/SharedStyles';

class DotProgressBar extends Component {
    render = () => {
        const { count, active, activeColor, inactiveColor } = this.props;
        const progress = [];
        for (let i = 0; i < count; i++) {
            const isSelected = i === active;
            progress.push(
                <View
                    key={i}
                    style={[
                        styles.dot,
                        { backgroundColor: isSelected ? activeColor : inactiveColor }
                    ]}
                />
            );
        }
        return (
            <View style={styles.container}>
                {progress}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 6 >> 1,
        margin: 6 >> 1
    }
});

const propTypes = {
    count: PropTypes.number,
    active: PropTypes.number,
    activeColor: PropTypes.string,
    inactiveColor: PropTypes.string
};

const defaultProps = {
    count: 0,
    active: 0,
    activeColor: '#4990E2',
    inactiveColor: '#BBBBBB',
};

DotProgressBar.propTypes = propTypes;
DotProgressBar.defaultProps = defaultProps;

export default DotProgressBar;
