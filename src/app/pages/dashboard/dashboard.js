import React, {Component} from 'react';
import './dashboard.css';
import * as camera from './camera';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.counterID = props.counterID;
        this.state = {
            didWaveHand: false,
            hand: '👋',
            handMsg: 'Помаши рукой',
            smile: '😄',
            smileMsg: 'Хорошего дня!'
        };
    }

    componentDidMount = () => {
        const access_token = this.props.token.access_token;
        const context = this;
        this.magic();
        setTimeout(function tick() {
            context.getData(access_token, true, context);
            context.getData(access_token, false, context);
            setTimeout(tick, 10000);
        }, 0);

        setTimeout(function tick100() {
            context.checkHi();
            setTimeout(tick100, 100);
        }, 0);
    }

    checkHi = () => {
        const hi = window.localStorage.getItem('hi');
        if (hi === '1'){
            this.setState({didWaveHand: true});
            console.log('hi');
        } else {
            this.setState({didWaveHand: false});
        }
    }

    magic = () => {
        // детектить сгибы внутри камеры и класть в localStorage флаг
        camera.bindPage();
    }

    getData = (authToken, visits, context) => {
        fetch(`https://api-metrika.yandex.net/stat/v1/data/bytime?metrics=ym:s:${visits ? 'visits' : 'pageviews'}&date1=364daysAgo&date2=today&group=year&id=${this.counterID}`, 
        {
            headers: {
                'Authorization': `OAuth ${authToken}`
            } 
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
            if (visits) {
                context.setState(prevState => ({...prevState, 'visits': myJson.totals[0][0]}));
            } else {
                context.setState(prevState => ({...prevState, 'pageViews': myJson.totals[0][0]}));
            }
        });
    }

    render() {
        return (
            <>
                <div className={'dashboard'}>
                    <div className={'dashboard-header'}>
                        <div className={'dashboard-header__center'}>
                            <h1>{'sbergraduate.ru'}</h1>
                        </div>
                    </div>
                    <div className={'dashboard-numbers'}>
                        <div className={'dashboard-header__left'}>
                            <h2>{this.state.visits ? this.state.visits : 'Загрузка'}</h2>
                        </div>
                        <div className={'dashboard-header__center'}>
                            <h2>{this.state.pageViews ? this.state.pageViews : 'Загрузка'}</h2>
                        </div>
                        <div className={'dashboard-header__right'}>
                            <h2 className={'green'}>{'Привет,'}</h2>
                        </div>
                    </div>

                    <div className={'dashboard-emoji'}>
                        <div className={'dashboard-header__left'}>
                            <h1 className={'emoji'}>{'📲'}</h1>
                        </div>
                        <div className={'dashboard-header__center'}>
                            <h1 className={'emoji'}>{'👀'}</h1>
                        </div>
                        <div className={'dashboard-header__right'}>
                            <h1 className={'emoji'}>{this.state.didWaveHand ? this.state.smile : this.state.hand}</h1>
                        </div>
                    </div>

                    <div className={'dashboard-titles'}>
                        <div className={'dashboard-header__left'}>
                            <h3 className={'gray'} >{'Визиты'}</h3>
                        </div>
                        <div className={'dashboard-header__center'}>
                            <h3 className={'gray'} >{'Просмотры'}</h3>
                        </div>
                        <div className={'dashboard-header__right'}>
                            <h3>{this.state.didWaveHand ? this.state.smileMsg : this.state.handMsg}</h3>
                        </div>
                    </div>

                    <div className={'dashboard-footer'}>
                        <div className={'dashboard-header__left'}>
                            <p className={'gray'} >{'*за год'}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}