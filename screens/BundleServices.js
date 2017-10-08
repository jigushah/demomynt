import React from 'react';
import { View, ScrollView } from 'react-native';
import _ from 'lodash';
import { List, ListItem , Text} from 'native-base';
import cs from '../constants/SharedStyles';
import BackButtonCustom from '../navigation/BackButtonCustom';

class BundleServices extends React.Component {
    static route = {
        navigationBar: {
            title: 'All Services',
            backgroundColor: '#fff',
            renderLeft: (route, props) => <BackButtonCustom />,
        },
    };

    render() {
        return (
            <View style={cs.container}>
                    <List style={[cs.bg000]}>
                        {_.map(this.props.route.params.services, (service) => {
                            return (
                                    <ListItem style={[cs.bg000, cs.borderBWidth1, cs.border200]}>
                                        <Text>{service.name}</Text>
                                    </ListItem>
                            );
                        })}
                    </List>
            </View>
        );
    }
}

export default BundleServices;
