
/**
 * @author lam
 */
'use strict';

import React, {Component,} from 'react'
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	StatusBar,
	BackHandler,
	TouchableOpacity,

	TextInput,

} from 'react-native'
import NavBar from '../../../common/NavBar'
import Toast, { DURATION } from 'react-native-easy-toast'
import { connect, } from 'react-redux'
import * as communityActions from '../../../actions/communityActions';
import {statusBarHeight, height, width, } from '../../../utils/uiHeader';
import * as GuardianService from '../../../utils/network/guardianService';
const contentHeight = height - NavBar.topbarHeight - statusBarHeight
const currentHeight = statusBarHeight;

class AddGuardians extends Component
{
	static navigationOptions = {
		header: null,
	}
	constructor(props)
	{
		super(props);
		this.state = {

		};
	}
	componentWillMount() {

		BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
	}
	componentDidMount() {

	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
	}

	onBackAndroid = () => {
		this.props.navigation.goBack();
		return true;
	};

	back() {
		this.props.navigation.pop();
	}

	onChangeName = (value) => {
		this.setState({
			name: value,
		})
	}

	onChangePhone = (value) => {
		console.log(value, "!2323")

		this.setState({
			mobile: value,
		})
	}

	send = () =>
	{
		var alias = this.state.name;
		var mobile = this.state.mobile;
		console.log(alias, mobile, !(/^1[3456789]\d{9}$/.test(mobile)), '监护人申请')
		if (!alias || !mobile || !(/^1[3456789]\d{9}$/.test(mobile)))
		{
			this.refs.toast.show('监护人手机号或名称错误');
			return;
		}
		GuardianService.applyGuardian({
			alias: alias,
			mobile: mobile,
		}).then(res =>
		{
			console.log(res, '申请')
			if (res.code == 200)
			{
				this.props.navigation.navigate("AddSuccess");
			}
			else
			{
				this.refs.toast.show(res.msg)
			}
		})
		.catch(err => {

		})

	}

	render() {

		let NavBarContent = null;
		let statusBar = null;

		NavBarContent = (<NavBar
			title="监护人申请"
			leftIcon="ios-arrow-back"
			leftPress={this.back.bind(this)}
		/>)
		statusBar = (<StatusBar
			backgroundColor={"#24A090"}
			barStyle={this.props.barStyle || 'light-content'}
			translucent={true}
			style={styles.statusBarHeight}
		/>)

		return (
			<ScrollView style={{flex: 1,backgroundColor: "#fff"}}>
				{statusBar}
				<View style={styles.statusBarHeight} backgroundColor={'#24A090'}/>
				{NavBarContent}
				<View style={styles.content}>
					<View style={styles.title}>
						<Text style={{fontSize: 20, paddingBottom: 20, }}>填写被监护人信息</Text>
					</View>
					<View
						style={styles.item}
					>
						<TextInput
							placeholder="请输入姓名"
							onChangeText={text => this.onChangeName(text)}
							underlineColorAndroid={'transparent'}
						/>
					</View>
					<View style={styles.item}>
						<TextInput
							placeholder="请输入手机号"
							onChangeText={text => this.onChangePhone(text)}
							keyboardType="numeric"
							underlineColorAndroid={'transparent'}

						/>
					</View>
					<TouchableOpacity style={styles.send} onPress={this.send}>
						<Text style={styles.fontWhite}>确认提交</Text>
					</TouchableOpacity>


				</View>

				<Toast
					ref="toast"
					position="center"
					isImg={true}
				/>
			</ScrollView>
		)
	}
}

function mapStateToProps(state)
{
	console.log(state, '子组件的属性')
	return {

	}
}

function mapDispatchToProps(dispatch)
{
	return {
		pbTitle: (title) => dispatch(communityActions.pbTitle(title)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGuardians)


const styles = StyleSheet.create({
	content: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: "flex-start",
		marginHorizontal: 20,
	},
	statusBarHeight: {
		height: statusBarHeight,
		width: width,
	},
	title: {
		paddingVertical: 20,
	},
	item: {
		height: 45,
		width: width - 40,
		marginBottom: 20,
		borderRadius: 10,
		flex: 1,
		backgroundColor: '#ddd',
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
	subContent: {
		paddingLeft: 20,
	},
	fontWhite: {
		color: '#fff',
	},
	send: {
		width: width - 100,
		marginLeft: 30,
		backgroundColor: '#24A090',
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
	},

});
