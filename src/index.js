import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider, DatePicker, message, Button, Checkbox, Input, Icon, Tooltip, Menu} from 'antd';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'
import 'antd/dist/antd.css';
import './index.css';
import moment from 'moment';
import {SketchField, Tools} from 'react-sketch';

const writeJsonFile = require('write-json-file');
const dateFormat = 'YYYY/MM/DD';
const {SubMenu} = Menu;
const fs = require('browserify-fs');

class App extends React.Component {
    constructor(props) {
        super(props);
        // let jsonData = require('./date.json');
        // console.log(jsonData);
        this.state = {
            date: null,
            name: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClickStock = this.handleClickStock.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleButtonSave = this.handleButtonSave.bind(this);
        fetch('http://localhost:3001/api/get', {
            headers: {
                'Accept': 'application/json, text/plain, */*'
            }
        }).then(
            res => res.json()
        ).then(json=>{
            console.log(json);
            this.setState({
                date: this.state.date,
                name: `${json.string}`
            })
        });
    }


    handleChange = date => {
        //alert(date);
        message.info(`You pick: ${date ? date.format('YYYY-MM-DD') : 'unselected'}`);
        this.setState({date: date});
        console.log(this.state);
    };

    handleButtonSave() {
        console.log(this.state);
        // let dataJson = {
        //     string: this.state.name
        // };
        // let data = JSON.stringify(dataJson);
        let str = this.state.name;
        fetch(`http://localhost:3001/api/get/${str}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*'
            },
            mode: 'no-cors'
        });
    };

    handleChangeInput = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onChange(e) {
        message.info(`checkbox is ${e.target.checked ? 'checked' : 'unchecked'}`);
    }

    handleButtonClick() {
        message.info(`You clicked button1`);
    };

    handleButtonClick2() {
        message.info(`You clicked on a cat.`);
    };

    handleClick = e => {
        message.info(`click ${e.key}`);
    };

    render() {
        const {date} = this.state;
        return (
            <ConfigProvider>

                <div style={{width: 400, margin: '5px auto'}}>
                    <label>This is a label, hello, world!</label>
                </div>

                <div style={{width: 400, margin: '5px auto'}}>
                    <label>This is a label with icons <FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon> <Icon
                        type="question-circle"/></label>
                </div>

                <div style={{width: 400, margin: '5px auto'}}>
                    <Button type="primary" onClick={this.handleButtonClick}>Button1</Button>
                    <button id="close-image" onClick={this.handleButtonClick2}><img src="cat.jpeg"/><br/>This is also a
                        button.
                    </button>
                </div>
                <div style={{width: 400, margin: '5px auto'}}>
                    <Checkbox onChange={this.onChange}>Checkbox</Checkbox>
                </div>

                <div style={{width: 400, margin: '5px auto'}}>
                    <Input id="inputbox" placeholder= {this.state.name} name='name'
                           value={this.state.name}
                           onChange={e => this.handleChangeInput(e)}/>
                    <Button type="primary" onClick={this.handleButtonSave}>save</Button>
                </div>
                <div style={{width: 400, margin: '30px auto'}}>
                    <Tooltip title="This is a tooltip popup">
                        <span>Tooltip will show on mouse enter.</span>
                    </Tooltip>
                </div>

                <div style={{width: 400, margin: '30px auto'}}>
                    <Menu
                        onClick={this.handleClick}
                        style={{width: 256}}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title={<span> <Icon type="mail"/>  <span>Navigation One</span> </span>}>
                            <Menu.ItemGroup key="g1" title="Item 1">
                                <Menu.Item key="1">Option 1</Menu.Item>
                                <Menu.Item key="2">Option 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key="g2" title="Item 2">
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>

                    </Menu>

                </div>

                <div style={{width: 400, margin: '5px auto'}}>
                    <label>Only support previous days (exclude today)</label>
                    <DatePicker onChange={this.handleChange}/>
                </div>

                <div style={{width: 400, margin: '5px auto'}}>
                    <Button type="primary" onClick={this.handleClickStock}>check open price
                        on {date ? date.format('YYYY-MM-DD') : 'Unselected'}</Button>
                </div>

                <div style={{width: 400, margin: '5px auto'}}>
                    <br/>Blow is a drawing panel
                </div>
                <SketchField width='720px'
                             height='720px'
                             tool={Tools.Pencil}
                             lineColor='white'
                             backgroundColor='black'
                             lineWidth={3}
                             style={{width: 400, margin: '5px auto'}}/>
                <div style={{width: 400, margin: '5px auto'}}>
                    <br/>Above is a drawing panel
                </div>

            </ConfigProvider>
        );
    }


    handleClickStock(e) {

        const key = '6UBZHL9OYN4T5LYE';
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=${key}`;
        console.log(this.state);
        axios.get(url)
            .then(res => {
                console.log(res.data);
                let stocks = res.data['Time Series (Daily)'][`${this.state.date.format('YYYY-MM-DD')}`]['1. open'];
                alert(`open price on ${this.state.date.format('YYYY-MM-DD')} is ${stocks}`);
                console.log(stocks);
            })
            .catch(error => console.log(error))
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));