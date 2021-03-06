/**
 * @author lam
 */
'use strict';

import React, {Component, } from 'react'
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	StatusBar,
	Dimensions, BackHandler,
	TouchableOpacity,
	Image,
	Alert,
	Platform,
} from 'react-native'
import NavBar from '../../../common/NavBar'
import Item from '../../../common/Item'
import Toast, { DURATION, } from 'react-native-easy-toast'
import * as qbDate from '../../../utils/qbDate';
import * as userService from '../../../utils/network/userService';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect, } from 'react-redux'
import * as bleActions from "../../../actions/device/bleActions";
import * as courseActions from '../../../actions/device/courseActions';
import * as webSocketActions from '../../../actions/webSocketActions';

import {statusBarHeight, height, width, } from '../../../utils/uiHeader';

const contentHeight = height - NavBar.topbarHeight - statusBarHeight;

//FontAwesome
class IsBuyCoursePage extends Component
{
	static navigationOptions = {
		header: null,
	}
	constructor(props)
	{
		super(props);
		this.state = {
			userCourseList: [],
			display: false,
			userArticleList: [],
			connectStatus: this.props.connectStatus,
			user: this.props.user,
		}
		this.didBlurSubscription = null;
		this.guardian = null;
	}
	componentWillMount()
	{

		BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
	}
	componentDidMount()
	{

		var guardian = this.props.navigation.state.params ? this.props.navigation.state.params.guardian : null;
		var dic = new Object();
		if (guardian)
		{
			dic.armariumScienceSession = guardian.userToken;
			this.guardian = guardian;
			dic.device_sn = guardian.deviceSn;
		}
		else
		{
			this.setState({
				connectStatus: this.props.connectStatus,
			})
			if (this.props.connectedDevice)
			{
				dic.device_sn = this.props.connectedDevice.device_sn
			}
		}


		this.props.getUserArticalCourseList(dic, this.onFetchArticalList);

	}
	onFetchArticalList = res =>
	{

		this.setState({
			userArticleList: res.data,
			display: true,
		})
	}
	refresh = () => {

		var dic = new Object();
		this.props.getUserArticalCourseList(dic, this.onFetchArticalList);
	}
	componentWillReceiveProps(nextProps)
	{

		this.setState({
			connectStatus: nextProps.connectStatus,
			user: nextProps.user,
			socketMsg: nextProps.socketMsg,
		})
		if (nextProps.socketMsg && nextProps.socketMsg.sn == 5 && nextProps.socketMsg !== this.props.socketMsg)
		{
			if (nextProps.socketMsg.url == "健康服务1")
			{
				var userArticleList = this.state.userArticleList;
				var index = nextProps.socketMsg.a;
				var courseItem = userArticleList[index];
				// this.props.navigation.navigate("BindingBuyCourse", {courseInfo: courseItem, })
				this.bindCourse({type: courseItem, index: index, })
			}
		}

	}


	componentWillUnmount()
	{
		BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
		this.didBlurSubscription && this.didBlurSubscription.remove();
	}

	onBackAndroid = () => {
		this.props.navigation.goBack();
		return true;
	};

	back()
	{
		this.props.navigation.pop();
	}
	//弹出提示
	alert(text, callback)
	{
		Alert.alert('提示', text, [{ text: "确定", onPress:()=>{ callback()} }]);
	}
	addDevice()
	{
		this.props.navigation.navigate("BleAddMethodsPage")
	}
	events(res)
	{
		console.log(this.props, '收到得数据')
		var type = res.type;
		var index = res.index;
		switch (type)
		{
		case 'binding':
			this.props.navigation.navigate('BindingBuyCourse',{courseInfo: res.item,  })

			break;

		}
	}

	bindCourse(item)
	{
		var _that = this;
		console.log(item, 'asdw')
		var remoteItem = this.props.navigation.state.params ? this.props.navigation.state.params.guardian : null;
		this.props.navigation.navigate("BindingBuyCourse", {courseInfo: item.type, guardian: remoteItem, refreshData: function ()
		{
			_that.refresh();//A页面的刷新方法
		},   })
		console.log(this.guardian, 'adqwq')
		if (this.guardian)
		{
			console.log(this.guardian, '222adqwq')
			var user = this.state.user;
			this.props.serviceSend(5, this.guardian.underGuardian, user.user_id,  '健康服务', '健康服务1', 0, item.a )
		}
	}

	render()
	{
		let list = null ;
		if (this.state.userArticleList.length < 1)
		{
			list = (<View style={styles.total}>
				<View style={{height: contentHeight - 80,justifyContent:'center',alignItems:'center'}}>
					<Text>暂无疗程</Text>
				</View>
			</View>)
		}
		else
		{
			list = this.state.userArticleList.map((item, index) => {
				let oparateBtn = null,buyDateView = null;
				if (item.status == 0)
				{
					oparateBtn = (<TouchableOpacity style={styles.btnAdd} onPress={this.events.bind(this,{type: 'binding',item: item})}>
						<Text style={styles.btnText}>激活</Text>
					</TouchableOpacity>)
				}
				if (item.source == 1)
				{
					buyDateView = (<Text style={styles.buyText} >购买</Text>)
				}
				else
				{
					buyDateView = (<Text style={styles.buyText} >赠送</Text>)
				}
				return (
					<View style={styles.list} key={item.id}>
						<TouchableOpacity style={styles.contentLeft} onPress={this.bindCourse.bind(this, {type: item, index: index,  })}>
							<View style={styles.leftLine}>
								<Text></Text>
							</View>
							<View style={styles.listContent}>

								<View style={styles.listTitle}>
									<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
										<Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold', }}>{item.course_goods_name}</Text>
										<View style={styles.dot}><Text></Text></View>
										<Text style={{ color: '#24A090', fontSize: 18, }}>{item.course_days}天</Text>
									</View>
								</View>
								<View style={styles.buyDate}>
									<Text style={styles.buyText}>{qbDate.DateFormat(item.add_time, 0)}</Text>
									<Text style={[styles.buyText, {paddingHorizontal: 5, }]}>{qbDate.DateFormat(item.add_time, 1)}</Text>
									{buyDateView}
								</View>
							</View>
							<View style={{paddingRight: 10}}><Icon name="ios-arrow-forward" size={24} color="#B1B1B1"></Icon></View>
						</TouchableOpacity>
					</View>
				)
			})
		}


		return (
			<View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
				<View style={styles.sBar} backgroundColor={'#24a090'}/>
				<NavBar
					title="健康服务"
					leftIcon="ios-arrow-back"
					leftPress={this.back.bind(this)}
				/>
				<ScrollView style={{height: contentHeight,backgroundColor: '#F5F5F5', }}>
					<View style={{flexDirection: 'column',backgroundColor: '#F5F5F5', paddingTop: 15, }}>
						{this.state.display ? list : null}
					</View>
				</ScrollView>
				<Toast ref="toast"
					position="center"
					defaultCloseDelay={2000}
				/>
			</View>
		)
	}
}

function mapStateToProps(state) {
	console.log(state,'子组件的属性')
	return {
		msg: state.courseList.msg,
		connectStatus: state.ble.connectStatus,
		user: state.loginIn.user,
		socketMsg: state.webSocketReducer.socketMsg,
		connectedDevice: state.ble.connectedDevice,
	}
}

function mapDispatchToProps(dispatch)
{
	return {
		getUserArticalCourseList: (dic, callback) => dispatch(courseActions.getUserArticalCourseList(dic, callback)),
		serviceSend: (a, b, c, d, e, f, g) => dispatch(webSocketActions.serviceSend(a, b, c, d, e, f, g)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(IsBuyCoursePage)


const styles = StyleSheet.create({
	title: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		color: "#666",
	},
	sBar: {
		height: statusBarHeight,
		width: width,
	},
	list: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: width - 20,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 15,
		backgroundColor: '#fff',
	},
	leftLine: {
		width: 5,
		height: 80,
		backgroundColor: 'rgba(36,160,144,.3)',
		borderRadius: 4,
	},
	contentLeft: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,

	},
	hr: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	imgStyle: {
		width: 65,
		height: 65,
		marginRight: 10,
		borderRadius: 50,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'

	},
	img: {
		width: 65,
		height: 65
	},
	listContent: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		flex: 1,
		paddingLeft: 10,
	},
	dot: {
		width: 5,
		height: 5,
		borderRadius: 100,
		backgroundColor: 'rgba(36,160,144,.3)',
		marginLeft: 5,
		marginRight: 5,
	},
	listTitle: {
		flexDirection: 'row',

	},
	buyDate: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buyText: {
		fontSize: 12,
		paddingTop: 7,
		color: '#666666',

	},
	btnAdd: {
		height: 30,
		width: 100,
		backgroundColor: '#24a090',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnBuy: {
		width: width - 50,
		height: 35,
		backgroundColor: '#24a090',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottomView: {
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		width: width,
	},
	total: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	operate: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#f4f4f4',
	},
	operateItem: {
		paddingVertical: 6,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnText: {
		fontSize: 12,
		color: '#fff'
	}
});
