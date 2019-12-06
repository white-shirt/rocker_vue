// import languageConfig from "../../assets/language.json";

const state = {
  devices: [],
  blescanflag: false,
  speed: 40,
  language: ""
}

//开启通知接收设备返回值
const startnotify = function (service_uuid, characteristic_uuid) {
  ble.startNotification(window.localStorage.getItem("Ble_device_id"), service_uuid, characteristic_uuid, function (Data) {
    var energy = String.fromCharCode.apply(null, new Uint8Array(Data));
    window.localStorage.setItem("AIeggy_energy", energy);
  }, function (reason) {
    
  })
}

const Tobuffer = function (head, cmdtype, data1, data2, end) {
  var buffer = new ArrayBuffer(5);
  var dataView = new DataView(buffer);
  dataView.setInt8(0, head);
  dataView.setInt8(1, cmdtype);
  dataView.setInt8(2, data1);
  dataView.setInt8(3, data2);
  dataView.setInt8(4, end);
  return buffer;
}

//发送指令
const send = function (dataArr) {
  var order = Tobuffer(dataArr[0], dataArr[1], dataArr[2], dataArr[3], dataArr[4]);
  var service_uuid, characteristic_uuid, rxcharacteristic_uuid;
  var device_id = window.localStorage.getItem("Ble_device_id");
  if (cordova.platformId.toLowerCase() == "android") {
    service_uuid = "0000ae00-0000-1000-8000-00805f9b34fb";
    characteristic_uuid = "0000ae01-0000-1000-8000-00805f9b34fb";
    rxcharacteristic_uuid = "0000ae02-0000-1000-8000-00805f9b34fb";
  } else if (cordova.platformId.toLowerCase() == "ios") {
    service_uuid = "ae00";
    characteristic_uuid = "ae01";
    rxcharacteristic_uuid = "ae02";
  }
  //当cmdtype为4时才开启监听
  try {
    if (dataArr[1] == 4) startnotify(service_uuid, rxcharacteristic_uuid);
    ble.writeWithoutResponse(
      device_id, service_uuid, characteristic_uuid, order, function () {
        
      }, function () {
      }
    )
  } catch (err) {
    console.log(err)
  }
}

//查询电量
const queryPower = function () {
  try {
    send([60, 4, 0, 0, 62]);
    setInterval(function () {
      send([60, 4, 0, 0, 62]);
    }, 10000)
  } catch (err) {
    console.log(err)
  }
}
document.addEventListener("deviceready", function () {
  queryPower();
})

const getters = {
  getBlescanflag(state) {
    return state.blescanflag;
  },
  getDevice(state) {
    return state.devices;
  },
  getspeed(state) {
    return state.speed;
  },
  getLanguage(state) {
    if (window.localStorage.getItem("language")) state.language = window.localStorage.getItem("language");
    else state.language = "English";
    return state.language;
  }
}

const scan = function () {
  var Devices = []
  ble.isEnabled(function () {
    ble.scan([], 5, function (device) {
      if (device.name == "AIeggy_Code") {
        Devices.push(device.id);
      }
      var temp = [];
      for (var i = 0; i < Devices.length; i++) {
        if (temp.indexOf(Devices[i]) == -1) {
          temp.push(Devices[i])
        }
      }
      state.devices = temp;
    }, function (reason) {
      
    });
  }, function () {
    
  })
}

const mutations = {
  changeBlescanflag(state, booleanflag) {
    state.blescanflag = booleanflag;
  },
  changeRefresh(state) {
    if (cordova.platformId.toLowerCase() == "ios") {
      ble.connectedPeripheralsWithServices(["ae00"], function (device) {
        for (var i = 0; i < device.length; i++) {
          if (device[i].name == "AIeggy_Code") {
            var num = i;
            ble.connect(device[num].id, function () {
              // window.plugins.toast.showLongCenter("connect successfully");
              window.localStorage.setItem("Ble_device_id", device[num].id);
            }, function (reason) {
              // window.plugins.toast.showLongCenter("connect failed");
            })
          }
        }
      }, function () {
        
      })
      scan();
    } else if (cordova.platformId.toLowerCase() == "android") {
      scan();
    }
  },
  changeSpeed(state, speed) {
    state.speed = speed;
  },
  sendOrder(state, dataArr) {
    send(dataArr);
  }
}

const actions = {
  invokeChangeRefresh(context) {
    context.commit('changeRefresh');
  },
  invokeChangeblescanflag(context, booleanflag) {
    context.commit('changeBlescanflag', booleanflag)
  },
  invokeSpeed(context, speed) {
    context.commit('changeSpeed', speed);
  },
  invokeSendOrder(context, dataArr) {
    context.commit('sendOrder', dataArr);
  },
  invokeNotify(context) {
    context.commit('notifyData');
  },
  invokeLanguage(context, curLanguage) {
    state.language = curLanguage;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}