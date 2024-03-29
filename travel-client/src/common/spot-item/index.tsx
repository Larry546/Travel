import PureComponent from "../pure-component";
import { View, Text } from "@tarojs/components";
import Image from "../../common/base-component/image";
import { ISpotItem } from "./interface";

import "./index.scss";

export default class Index extends PureComponent<ISpotItem> {
    constructor(props: ISpotItem) {
        super(props);
    }

    goToDetail = () => {
        const { spotId } = this.props.spotInfo;
        this.push(`/pages/spot-detail/index?spotId=${spotId}`);
    };

    render() {
        const { spotInfo } = this.props;
        const { spotImageurl, spotName, spotIntro, ticketList, spotRateNum } = spotInfo;
        return (
            <View className="item" onClick={this.goToDetail}>
                <Image url={spotImageurl} classWrap={"item_image"} width={"100%"} height={"100%"} />

                <View className="item_bottom">
                    <View className="item_bottom_name">
                        <Text>{spotName}</Text>
                    </View>

                    {spotIntro ? (
                        <View className="item_bottom_tag">
                            <Text>{spotIntro}</Text>
                        </View>
                    ) : null}

                    <View className="item_bottom_bottom">
                        {ticketList?.length ? (
                            <View className="item_bottom_bottom_price">
                                <Text className="item_bottom_bottom_price_currency">￥</Text>
                                <Text className="item_bottom_bottom_price_number">
                                    {ticketList[0].ticketPrice}
                                </Text>
                            </View>
                        ) : null}

                        <View className="item_bottom_bottom_rate">
                            <Text>{spotRateNum || 0}条评论</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
