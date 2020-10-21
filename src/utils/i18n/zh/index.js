export default {
    success: '成功',
    failed: '失败',
    confirm: '确认',
    networkError: '网络出错',
    laserError: '开关激光失败，写入数据错误',
    autoHrError: '开关自动心率失败，写入数据错误',
    hrError: '开关手动心率失败,写入数据错误',
    LaserManuallyParametersError: '设置手动激光参数失败,写入数据错误',
    operateMore: '重复操作',
    charge: '请充电！',
    home: {
        connectDevice: '连接设备',
        noConnectDeviceText: '请先连接设备',
        adapterOffText: '请打开蓝牙',
        noSupported: '不支持',
        getHRDataFailed: '获取心率数据失败',
        getSportDataFailed: '获取运动数据失败',
        getLaserDataFailed: '获取激光数据失败',
        connectDeviceFailed: '连接设备失败',
        automaticTopicText: '自动心率每15分钟开启一次，每次开启3分钟。', 
        noPrompted: '不再提示',
        propsPhone: '请将设备靠近手机',
        disbindFail: '解绑失败',
        outOtherDevices: '移开其他设备',
        
        laser: '激光',
        heartRate: '心率',
        automatic: '自动',
        sport: '运动',
        day: '日',
        week: '周',
        month: '月',
        sportDistance: '路程 ',
        sportCalorie: '卡路里',

        autoLaserSwitchText: "自动激光",
        autoLaserSwitchCloseText: '关',
        autoLaserSwitchOpenText: '开',
        laserPowerText: "激光功率",
        laserPowerDefaultText: '默认',
        laserDurationText: '时长(分)',

        pointerAlertTopicText: '请在以下输入框中,输入现在表盘的时间.',
        pointerAlertHourText: '时针',
        pointerAlertMinuteText: '分针',

        questionAlertText: '净血疗程以智能模式每天自动开启三次，连续工作10天，自动休息5天，15天为一个循环，3个月为一个疗程周期。每天8点45分第一次自动开启激光32分钟（主脾胃经）；13点第二次自动开启8分钟（主小肠经）；17点30分第三次开启激光32分钟（主肾经）。该疗程属激光中医养生基础疗程，适用于各种因血液微循环系统不畅而引起的亚健康症状，尤其适用于高血脂、高血粘症人群。',
    
        allData: '所有数据',
        updating: '更新中',
        updateDataTopicText: '请选择以下选项进行上传.',
    },

    login: {
        headerTitle: '登录',
        forgetPasswordText: '忘记密码',
        registerText: '注册',
        signInText: '登录',
        accountOrPasswordWrongText: "账号或者密码错误",
        eMail: '邮箱',
        password: '密码'
    },

    register: {
        headerTitle: '注册',
        codeTopicText: '验证码将发送到你的邮箱，如果没有收到请重发',
        enterEmailText: '邮箱',
        enterPhoneText: '手机',
        tapCodeText: '验证码',
        sendText: '发送',
        resendText: '重发',
        emailUsed: '账号已被使用',
        passwordLengthTopicText: '密码长度在6-16个字节',
        inputEmailText: '邮箱不能为空',
        newPasswordText: '密码',
        retapPasswordText: '确认密码'

    },

    resetPassword: {
        headerTitle: "重置密码"
    },

    connect: {
        searching: '搜索设备中',
        connect: '连接',
        reSearchText: '未搜索到设备，请重新搜索',
        searchDevice: '搜索设备',
        reSearchDevice: '重新搜索',
        connectDevice: '连接设备',
        selectDevice: '选择你的设备',
        connecting: '连接设备中',
        topicFirstText: '请激活你的设备',
        topicSecondText: '按下设备上的按钮或者敲击设备',
        bindingDevice: '绑定设备',
        binding: '绑定中',
        myDevice: '我的设备',
        noDevice: '没有设备',
        jumpOver: '跳过',
        disConnectDevice: '断开设备',
        connectSuccess: '连接成功',
    },

    personalCenter: {

        headerTitle: '个人中心',
        resetPassword: '重置密码',
        exit: '退出',
    },
    data: {
        step:'步',      
        step1:'步',                  
        toDaystep:'今日步数',              
        distance:'路程',                
        kilometre:'公里',          
        consume:'消耗',                
        kilocalorie:'千卡',            
        Walk:"行走",                       
        stepNumber:'步数',                 
        motion:'运动',                      
        noData:'暂无数据',                  
        laser:'激光' ,                  
        month:'月',
        day:'日',
        Highest:'最高',                
        second:'次',
        Minute:'分钟',
        minimum:'最低',
        heartRate:'心率',
        tenThousand:'万',
        TotalOpeningTime:"开启总时间",
        openingTime: '开启时间',
        OpeningTimes:'开启次数',
        beforeDays:'前一天',
        afterDays:'后一天',
        nowadays:'今日'

    },
};