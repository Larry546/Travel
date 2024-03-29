import { Component } from "react";
import "./common/base-component/icon/icon.scss";
import "taro-ui/dist/style/index.scss";
import "./app.scss";

class App extends Component {
    componentDidMount() {}

    componentDidShow() {}

    componentDidHide() {}

    componentDidCatchError() {}

    // this.props.children 是将要会渲染的页面
    render() {
        return this.props.children;
    }
}

export default App;
