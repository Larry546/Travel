import { SearchOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Input,
    message,
    Popconfirm,
    Row,
    Space,
    Table as BaseTable,
} from "antd";
import Highlighter from "react-highlight-words";
import { ColumnProps } from "antd/lib/table";
import React from "react";
import BreadcrumbCustom from "../../basic-component/widget/BreadcrumbCustom";
import { ISpotState } from "./interface";
import {
    getSpotList as _getSpotList,
    getTicketList as _getTicketList,
    deleteSpot as _deleteSpot,
    unDeleteSpot as _unDeleteSpot,
    deleteTicket as _deleteTicket,
    unDeleteTicket as _unDeleteTicket,
} from "../../../service/api";

export default class SpotList extends React.PureComponent<any> {
    state: ISpotState;
    searchInput: any;
    constructor(props: any) {
        super(props);
        this.state = {
            spotlist: [],
            ticketlist: [],
            searchText: "",
            searchedColumn: "",
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList = async () => {
        let res = await _getSpotList();
        let list = res || [];
        for (let spot of list) {
            spot.key = spot.spotId;
        }
        this.setState({
            spotlist: list,
        });
    };

    getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: any) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value: any, record: any) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: (text: any) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    handleReset = (clearFilters: any) => {
        clearFilters();
        this.setState({ searchText: "" });
    };

    getTicket = async (spotId: number) => {
        let res = await _getTicketList(spotId);
        let list = res || [];
        for (let ticket of list) {
            ticket.key = ticket.ticketId;
        }
        this.setState({
            ticketlist: list,
        });
    };
    onExpand = (expanded: any, record: any) => {
        if (expanded) {
            this.getTicket(record.spotId);
        } else {
            this.setState({
                ticketlist: [],
            });
        }
    };

    deleteSpot = async (spotId: number) => {
        let res = await _deleteSpot(spotId);
        if (res) {
            this.getList();
            message.success("删除成功!");
        } else {
            message.error("删除失败");
        }
    };

    unDeleteSpot = async (spotId: number) => {
        let res = await _unDeleteSpot(spotId);
        if (res) {
            this.getList();
            message.success("恢复成功!");
        } else {
            message.error("恢复失败");
        }
    };

    deleteTicket = async (spotId: number, ticketId: number) => {
        let res = await _deleteTicket(ticketId);
        if (res) {
            this.getTicket(spotId);
            message.success("删除成功!");
        } else {
            message.error("删除失败");
        }
    };

    unDeleteTicket = async (spotId: number, ticketId: number) => {
        let res = await _unDeleteTicket(ticketId);
        if (res) {
            this.getTicket(spotId);
            message.success("恢复成功!");
        } else {
            message.error("恢复失败");
        }
    };

    render() {
        const { spotlist, ticketlist } = this.state;

        const columns: ColumnProps<any>[] = [
            {
                title: "spot_id",
                dataIndex: "spotId",
                key: "1",
                fixed: "left",
                width: 100,
            },
            {
                title: "spot_name",
                dataIndex: "spotName",
                key: "2",
                ...this.getColumnSearchProps("spotName"),
            },
            {
                title: "spot_address",
                dataIndex: "spotAddress",
                key: "3",
            },
            {
                title: "spot_openhour",
                dataIndex: "spotOpenhour",
                key: "4",
                width: 100,
            },
            {
                title: "spot_offhour",
                dataIndex: "spotOffhour",
                key: "5",
                width: 100,
            },
            {
                title: "spot_imageURL",
                dataIndex: "spotImageurl",
                key: "6",
            },
            {
                title: "spot_type",
                dataIndex: "spotType",
                key: "7",
                filters: [
                    {
                        text: "主题乐园",
                        value: "主题乐园",
                    },
                    {
                        text: "城市观光",
                        value: "城市观光",
                    },
                    {
                        text: "动植物园",
                        value: "动植物园",
                    },
                ],
                onFilter: (value: any, record: any) => record.spotType.indexOf(value) === 0,
            },
            {
                title: "spot_intro",
                dataIndex: "spotIntro",
                key: "8",
            },
            {
                title: "Action",
                key: "operation",
                fixed: "right",
                width: 150,
                render: (value, record) => (
                    <div>
                        {record.isDeleted === 0 ? (
                            <Space size={"middle"}>
                                <a
                                    onClick={() => {
                                        this.props.history.push({
                                            pathname: "/app/spot/edit",
                                            state: {
                                                spotId: record.spotId,
                                            },
                                        });
                                    }}
                                >
                                    编辑
                                </a>{" "}
                                <Popconfirm
                                    title={"确定要删除该景点?"}
                                    onConfirm={() => {
                                        this.deleteSpot(record.spotId);
                                    }}
                                >
                                    <a>删除</a>
                                </Popconfirm>
                            </Space>
                        ) : (
                            <Space size={"middle"}>
                                <span>已删除</span>
                                <Popconfirm
                                    title={"确定要恢复该景点?"}
                                    onConfirm={() => {
                                        this.unDeleteSpot(record.spotId);
                                    }}
                                >
                                    <a>恢复</a>
                                </Popconfirm>
                            </Space>
                        )}
                    </div>
                ),
            },
        ];

        const ticketcolums = [
            { title: "ticket_id", dataIndex: "ticketId", key: "1", width: 100 },
            { title: "ticket_name", dataIndex: "ticketName", key: "2" },
            { title: "ticket_price", dataIndex: "ticketPrice", key: "3" },
            { title: "ticket_request", dataIndex: "ticketRequest", key: "4" },
            { title: "ticket_tag", dataIndex: "ticketTag", key: "5" },
            {
                title: "Action",
                key: "operation",
                width: 150,
                render: (value: any, record: any) => (
                    <div>
                        {record.isDeleted === 0 ? (
                            <Space size="middle">
                                <a
                                    onClick={() => {
                                        this.props.history.push({
                                            pathname: "/app/spot/ticket",
                                            state: {
                                                spotId: record.spotId,
                                                ticketId: record.ticketId,
                                            },
                                        });
                                    }}
                                >
                                    编辑
                                </a>
                                <Popconfirm
                                    title={"确定要删除该门票?"}
                                    onConfirm={() => {
                                        this.deleteTicket(record.spotId, record.ticketId);
                                    }}
                                >
                                    <a>删除</a>
                                </Popconfirm>
                            </Space>
                        ) : (
                            <Space size={"middle"}>
                                <span>已删除</span>
                                <Popconfirm
                                    title={"确定要恢复该门票?"}
                                    onConfirm={() => {
                                        this.unDeleteTicket(record.spotId, record.ticketId);
                                    }}
                                >
                                    <a>恢复</a>
                                </Popconfirm>
                            </Space>
                        )}
                    </div>
                ),
            },
        ];

        const expandedRowRender = () => {
            return (
                <BaseTable
                    columns={ticketcolums}
                    dataSource={ticketlist}
                    pagination={false}
                    tableLayout={"fixed"}
                />
            );
        };
        return (
            <div className="gutter-example">
                <BreadcrumbCustom breads={["景点管理", "景点列表"]} />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="景点管理" bordered={false}>
                                <div>
                                    <BaseTable
                                        columns={columns}
                                        dataSource={spotlist}
                                        expandable={{
                                            expandedRowRender,
                                            onExpand: this.onExpand,
                                        }}
                                        scroll={{ x: 1200 }}
                                        tableLayout={"fixed"}
                                        pagination={{ defaultPageSize: 5 }}
                                    />
                                    <style>
                                        {`
                                            .custom-filter-dropdown {
                                            padding: 8px;
                                            border-radius: 6px;
                                            background: #fff;
                                            box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
                                            }
                                            .custom-filter-dropdown input {
                                            width: 130px;
                                            margin-right: 8px;
                                            }
                                            .highlight {
                                            color: #f50;
                                            }
                                        `}
                                    </style>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
