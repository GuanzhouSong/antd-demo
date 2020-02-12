import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, DatePicker, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import 'antd/dist/antd.css';
import './index.css';


class App extends React.Component {
    state = {
        date: null,
    };

    handleChange = date => {
        //alert(date);
        message.info(`You pick: ${date ? date.format('YYYY-MM-DD') : 'unselected'}`);
        this.setState({ date });
    };
    render() {
        const { date } = this.state;
        return (
            <ConfigProvider>
                <div style={{ width: 400, margin: '5px auto' }}>
                    <label>This is a label, hello, world!</label>
                    {/*<label><FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon></label>*/}
                </div>
                <div style={{ width: 400, margin: '5px auto' }}>
                    <label>This is a label with coffee icon<FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon></label>
                </div>
                <div style={{ width: 400, margin: '5px auto' }}>
                    <DatePicker onChange={this.handleChange} />
                    <div style={{ marginTop: 20 }}>
                        current date：{date ? date.format('YYYY-MM-DD') : 'Unselected'}
                    </div>
                </div>
            </ConfigProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));