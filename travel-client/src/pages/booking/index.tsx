import PureComponent from "../../common/pure-component";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtCalendar, AtFloatLayout, AtInput, AtInputNumber } from "taro-ui";
import H5NavBar from "../../common/h5NavBar";
import getEnv from "../../system/tools/environment";
import Icon from "../../common/base-component/icon";
import Image from "../..//common/base-component/image";
import { ISpotInfo } from "../spot-detail/interface";
import { IBookingState } from "./interface";
import TravelerList from "../../common/traveler/list";
import { IPassengerInfo } from "src/common/traveler/edit/interface";

import "./index.scss";

definePageConfig({
    navigationBarTitleText: "订单填写",
});

export default class Index extends PureComponent<any> {
    top: number;
    state: IBookingState;
    spotInfo: ISpotInfo;
    constructor(props: any) {
        super(props);
        this.top = getEnv() === "H5" ? 95 : 0;
        this.spotInfo = {
            spotId: 1,
            spotName: "绍兴柯岩风景区",
            spotAddress: "浙江省绍兴市柯桥区柯岩大道558号柯岩风景区大道558号柯岩风景区",
            spotOpenhour: "8:00",
            spotOffhour: "16:00",
            spotRateScore: 4.5,
            spotRateNum: 996,
            spotType: ["游乐园", "自然风景"],
            ticketList: [
                {
                    ticketId: 1,
                    ticketName: "成人票",
                    ticketPrice: 99,
                    ticketRequest:
                        "1.4米以上1.4米以上1.4米以上1.4米以上1.4米以上1.4米以上1.4米以上1.4米以上",
                    ticketTag: ["无需取票", "无忧退"],
                },
                {
                    ticketId: 2,
                    ticketName: "儿童票票",
                    ticketPrice: 44,
                    ticketRequest: "1.0米(含)-1.4米(含)1.0米(含)-1.4米(含)",
                    ticketTag: ["无需取票"],
                },
            ],
        };
        this.state = {
            calendarOpen: false,
            listOpen: false,
            selectedDate: new Date().toLocaleDateString(), // 需要补零 todo
            contact: "",
            passengerlist: [
                {
                    passengerId: 1,
                    passengerName: "啊哈啊哈啊哈啊哈啊哈啊哈啊哈啊哈啊哈啊哈啊哈",
                    passengerNumber:
                        "123456123456123456123456123456123456123456123456123456123456123456123456123456123456",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 2,
                    passengerName: "哈哈1",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 3,
                    passengerName: "哈2哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 4,
                    passengerName: "哈哈3",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 5,
                    passengerName: "哈4哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 6,
                    passengerName: "哈rr哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 7,
                    passengerName: "哈ss哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 8,
                    passengerName: "哈xx哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 9,
                    passengerName: "哈aa哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
                {
                    passengerId: 10,
                    passengerName: "哈gg哈",
                    passengerNumber: "123",
                    passengerSex: "F",
                    passengerBirth: "1988-01-01",
                },
            ],
        };
        this.initTicketList();
        console.log(
            "🚀 ~ file: index.tsx ~ line 53 ~ Index ~ constructor ~ this.state",
            this.state
        );
    }
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentDidShow() {}

    componentDidHide() {}

    initTicketList = () => {
        let list: any = [];
        this.spotInfo.ticketList?.map(item => {
            list.push({
                ticketId: item.ticketId,
                ticketName: item.ticketName,
                ticketPrice: item.ticketPrice,
                ticketNum: 0,
                passenger: [1, 2],
            });
        });

        this.state.orderTicketList = list;
    };

    onOpenCalendar = () => {
        this.setState({ calendarOpen: true });
    };

    onCloseCalendar = () => {
        this.setState({ calendarOpen: false });
    };

    onOpenList = ticketInfo => {
        this.setState({ listOpen: true, currentTicket: ticketInfo });
    };

    onCloseList = () => {
        this.setState({ listOpen: false });
    };

    onDayClick = res => {
        console.log("🚀 ~ file: index.tsx ~ line 70 ~ Index ~ res", res);
        this.setState({ selectedDate: res && res.value });
        this.onCloseCalendar();
    };

    onChangeContact = res => {
        console.log("🚀 ~ file: index.tsx ~ line 83 ~ Index ~ res", res);
        this.setState({ contact: res });
    };

    findTicket = id => {
        const { orderTicketList } = this.state;
        return orderTicketList?.find(item => item.ticketId === id);
    };

    getCount = item => {
        if (!item.passenger) {
            return item.ticketNum;
        } else {
            return item.ticketNum - item.passenger.length;
        }
    };

    changeTicketNum = (value, id) => {
        const { orderTicketList } = this.state;
        let index = orderTicketList?.findIndex(item => {
            return item.ticketId === id;
        });
        if (typeof index != "undefined" && orderTicketList) {
            let newList = orderTicketList;
            let newItem = newList[index];
            newItem && (newItem.ticketNum = value);
            this.setState((preState: IBookingState) => {
                return {
                    ...preState,
                    orderTicketList: newList,
                };
            });
        }
    };

    getTotal = () => {
        const { orderTicketList } = this.state;
        let total = 0;
        orderTicketList?.map(item => (total = total + item.ticketNum * item.ticketPrice));
        return total;
    };

    getPass = id => {
        const { passengerlist } = this.state;
        let pass: IPassengerInfo = {
            passengerName: "",
            passengerNumber: "",
        };
        passengerlist.forEach(item => {
            if (item.passengerId == id) {
                pass = item;
            }
        });
        return pass;
    };

    onSelectTraveler = pass => {
        const { currentTicket, orderTicketList } = this.state;
        let ticketNum = currentTicket?.ticketNum;
        let passengerNum = currentTicket?.passenger?.length || 0;
        if (!ticketNum || !currentTicket || currentTicket.passenger?.includes(pass.passengerId)) {
            return;
        }
        if (ticketNum === passengerNum) {
            this.toast.show(
                `你已经选择了${currentTicket?.ticketNum}位${currentTicket?.ticketName}`
            );
        } else if (ticketNum > passengerNum) {
            currentTicket?.passenger?.push(pass.passengerId);
            let index = orderTicketList?.findIndex(item => {
                return item.ticketId === currentTicket?.ticketId;
            });
            let newList = orderTicketList;
            newList && typeof index != "undefined" && (newList[index] = currentTicket);
            this.setState((prevState: IBookingState) => {
                return {
                    ...prevState,
                    orderTicketList: newList,
                };
            });
            this.onCloseList();
        }
    };

    unSeletctTraveler = (ticketInfo, passid) => {
        let passIndex = ticketInfo.passenger.findIndex(id => {
            return id === passid;
        });
        ticketInfo.passenger.splice(passIndex, 1);
        const { orderTicketList } = this.state;
        let newList = orderTicketList;
        let ticketIndex = newList?.findIndex(item => {
            return item.ticketId == ticketInfo.ticketId;
        });
        newList && typeof ticketIndex != "undefined" && (newList[ticketIndex] = ticketInfo);
        this.setState((prev: IBookingState) => {
            return {
                ...prev,
                orderTicketList: newList,
            };
        });
    };

    render() {
        const { selectedDate, calendarOpen, listOpen, orderTicketList, currentTicket } = this.state;
        return (
            <View className="booking">
                <H5NavBar title={"订单填写"} />
                <ScrollView scrollY className="booking_info" style={{ top: this.top }}>
                    <View className="booking_info_spot">
                        <View className="booking_info_spot_title">
                            <Text>{this.spotInfo.spotName}</Text>
                        </View>
                        <View className="booking_info_spot_sku">
                            <View className="booking_info_spot_sku_line" />
                            <View className="booking_info_spot_sku_leftSpot" />
                            <View className="booking_info_spot_sku_rightSpot" />
                            <View className="booking_info_spot_sku_date">
                                <View className="booking_info_spot_sku_date_title">
                                    <Text>选择日期</Text>
                                </View>
                                <View
                                    className="booking_info_spot_sku_date_selector"
                                    onClick={this.onOpenCalendar}
                                >
                                    <Text>{selectedDate}</Text>
                                </View>
                                <AtFloatLayout
                                    isOpened={calendarOpen}
                                    onClose={this.onCloseCalendar}
                                >
                                    <AtCalendar
                                        format={"YYYY/MM/DD"}
                                        minDate={new Date().toLocaleDateString()}
                                        onDayClick={this.onDayClick}
                                    />
                                </AtFloatLayout>
                            </View>
                            <View className="booking_info_spot_sku_tickets">
                                {this.spotInfo.ticketList?.length &&
                                    this.spotInfo.ticketList.map((item, index) => {
                                        return (
                                            <View
                                                className="booking_info_spot_sku_ticket"
                                                key={index}
                                            >
                                                <View className="booking_info_spot_sku_ticket_fline">
                                                    <View className="booking_info_spot_sku_ticket_name">
                                                        <Text>{item.ticketName}</Text>
                                                    </View>
                                                    <View className="booking_info_spot_sku_ticket_right">
                                                        <View className="booking_info_spot_sku_ticket_right_price">
                                                            <Text>￥{item.ticketPrice}</Text>
                                                        </View>

                                                        <AtInputNumber
                                                            type="number"
                                                            value={
                                                                this.findTicket(item.ticketId)
                                                                    ?.ticketNum || 0
                                                            }
                                                            onChange={value =>
                                                                this.changeTicketNum(
                                                                    value,
                                                                    item.ticketId
                                                                )
                                                            }
                                                        />
                                                    </View>
                                                </View>
                                                <View className="booking_info_spot_sku_ticket_sline">
                                                    <Text>
                                                        {item.ticketRequest &&
                                                            "适用人群：" + item.ticketRequest}
                                                    </Text>
                                                </View>
                                                <View className="booking_info_spot_sku_ticket_tline">
                                                    {item.ticketTag?.map((tag, index) => {
                                                        return (
                                                            <View
                                                                style={{
                                                                    color: "#0086f6",
                                                                }}
                                                                key={index}
                                                            >
                                                                <Text>{tag} </Text>
                                                                <Text style={{ color: "#666" }}>
                                                                    |{" "}
                                                                </Text>
                                                            </View>
                                                        );
                                                    })}
                                                    <View>
                                                        <Text style={{ color: "#F70" }}>官方</Text>
                                                        <Text> | 购买须知 </Text>
                                                        <Icon type={"right"} />
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    })}
                            </View>
                        </View>
                    </View>
                    <View className="booking_info_passenger">
                        <View className="booking_info_passenger_header">
                            <Text className="booking_info_passenger_header_title">出行信息</Text>
                        </View>
                        <View className="booking_info_passenger_info">
                            {orderTicketList?.map((item, index) => {
                                return item.ticketNum !== 0 ? (
                                    <View
                                        className="booking_info_passenger_info_single"
                                        key={index}
                                    >
                                        <View className="booking_info_passenger_info_single_name">
                                            <Text>{item.ticketName}</Text>
                                        </View>
                                        <View className="booking_info_passenger_info_single_right">
                                            <View className="booking_info_passenger_info_single_travelers">
                                                {item.passenger?.map((pasid, index) => {
                                                    return (
                                                        <View
                                                            className="booking_info_passenger_info_single_traveler"
                                                            key={index}
                                                        >
                                                            <View
                                                                className="booking_info_passenger_info_single_traveler_icon"
                                                                onClick={() => {
                                                                    this.unSeletctTraveler(
                                                                        item,
                                                                        pasid
                                                                    );
                                                                }}
                                                            >
                                                                <Icon
                                                                    type={"close-circle"}
                                                                    color={"#bbb"}
                                                                    size={20}
                                                                />
                                                            </View>

                                                            <View
                                                                className="booking_info_passenger_info_single_traveler_info"
                                                                onClick={() => {
                                                                    this.onOpenList(item);
                                                                }}
                                                            >
                                                                <Text className="booking_info_passenger_info_single_traveler_info_webkit">
                                                                    {
                                                                        this.getPass(pasid)
                                                                            .passengerName
                                                                    }
                                                                </Text>
                                                                <Text className="booking_info_passenger_info_single_traveler_info_webkit booking_info_passenger_info_single_traveler_info_id">
                                                                    证件号：
                                                                    {
                                                                        this.getPass(pasid)
                                                                            .passengerNumber
                                                                    }
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                            {!item.passenger ||
                                            item.ticketNum > item.passenger?.length ? (
                                                <View
                                                    className="booking_info_passenger_info_single_rest"
                                                    onClick={() => {
                                                        this.onOpenList(item);
                                                    }}
                                                >
                                                    <Text>还需添加 </Text>
                                                    <Text style={{ color: "#f60" }}>
                                                        {this.getCount(item)}
                                                    </Text>
                                                    <Text> 位{item.ticketName}</Text>
                                                </View>
                                            ) : null}
                                        </View>
                                        <View
                                            className="booking_info_passenger_info_single_icon"
                                            onClick={() => {
                                                this.onOpenList(item);
                                            }}
                                        >
                                            <Icon type={"right"} size={24} color={"#bbb"} />
                                        </View>
                                    </View>
                                ) : null;
                            })}
                            <AtFloatLayout
                                scrollY
                                isOpened={listOpen}
                                title={"游客列表"}
                                onClose={this.onCloseList}
                            >
                                <TravelerList
                                    orderTicketInfo={currentTicket}
                                    selectTraveler={this.onSelectTraveler}
                                />
                            </AtFloatLayout>
                        </View>
                        <View className="booking_info_passenger_contact">
                            <View className="booking_info_passenger_contact_title">
                                <Text>联系手机</Text>
                            </View>
                            <View className="booking_info_passenger_contact_input">
                                <AtInput
                                    placeholder={"用于生成订单"}
                                    name={"contact"}
                                    type={"number"}
                                    onChange={this.onChangeContact}
                                />
                            </View>
                        </View>
                    </View>
                    <Image
                        url={"https://dimg04.c-ctrip.com/images/0AS4h120008q4640297BB.png"}
                        width={"100%"}
                        height={"100%"}
                        classWrap={"booking_info_mindtour"}
                    />
                </ScrollView>
                <View className="booking_footer">
                    <View className="booking_footer_total">
                        <View className="booking_footer_total_title">
                            <Text>总额：</Text>
                        </View>
                        <View className="booking_footer_total_price">
                            <Text>￥{this.getTotal()}</Text>
                        </View>
                    </View>
                    <View className="booking_footer_submit" onClick={() => {}}>
                        <Text>提交订单</Text>
                    </View>
                </View>
            </View>
        );
    }
}