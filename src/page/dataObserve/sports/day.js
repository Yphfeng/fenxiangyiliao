import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    BackHandler,
    ToastAndroid,
    WebView,
    View,
    ActivityIndicator,
    StatusBar,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';
import NavBar from '../../../common/NavBar'
import CookieManager from 'react-native-cookies';
import { connect } from 'react-redux'
import * as dataService from '../../../utils/network/dataService';
const useWebKit = true;
const currentHeight = StatusBar.currentHeight;
const {width} = Dimensions.get('window');
class DayPage extends Component {
    static navigationOptions = {
        tabBarLabel: '今日'
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentDidMount() {
        console.log("获取今天数据");
        dataService.getMotionData({type:"day"})
        .then(res => {
            console.log(res,'获取今日数据')
            if(res.status == 1) {

            }
        })
        .catch(err => {

        })

    }

    back() {
        this.props.navigation.pop();
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor: '#24a090',paddingLeft: 15,paddingRight: 15}}>
                <View style={styles.topView}>
                    <Text style={[{fontSize: 24,fontWeight: 'bold'},styles.white]}>0</Text>
                    <Text style={styles.white}>今日里程(km)</Text>
                    <View style={styles.sportsData}>
                        <View style={styles.dataItem}>
                            <Text style={styles.white}>0</Text>
                            <Text style={styles.white}>行走(步)</Text>
                        </View>
                        <View style={styles.dataItem}>
                            <Text style={styles.white}>0</Text>
                            <Text style={styles.white}>消耗(卡)</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.tips}>
                    <Text style={{color: '#ccc'}}>温馨提示</Text>
                    <Text style={{paddingTop: 10}}>今日行走步数未达到5000步，运动量不够</Text>
                </View>
                <View style={styles.sportsList}>
                    <View style={styles.listTitle}><Text style={{fontSize: 18}}>今日步数排行</Text></View>
                </View>
            </View>
        );
    }
}
function mapStateToProps(state) {
    console.log(state,'子组件的属性')
    return {
        msg: state.loginIn.msg
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DayPage)


const styles = StyleSheet.create({
    container: {
        marginTop: currentHeight
    },
    sBar: {
        height: StatusBar.currentHeight,
        width: width
    },
    white: {
        color: '#fff'
    },
    flash: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabBarIcon: {
        width: 19,
        height: 19,
    },
    topView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    sportsData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    dataItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tips: {
        backgroundColor: '#DEF0EE',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20,
        borderRadius: 10,
    },
    sportsList: {
        backgroundColor: '#DEF0EE',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    listTitle: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
