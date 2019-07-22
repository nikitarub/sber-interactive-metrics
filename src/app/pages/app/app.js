import React, {Component} from 'react';
import Dashboard from '../dashboard/dashboard';
import config from '../../../../metrics.config.js';

/**
 * config = {
    * client_id
    * client_secret
    * id счетчика
 * }
 */

export default class App extends Component {
    constructor() {
        super();
        this.state = {};
       
        
        this.client_id = config.client_id;
        this.client_secret = config.client_secret;
        const clientIDTemplate = `&client_id=${this.client_id}`;
        const redirect_uri = '&redirect_uri=http://localhost:8000/';
        this.linkToGetCode = 'https://oauth.yandex.ru/authorize?response_type=code' + clientIDTemplate + redirect_uri;
    }

    componentDidMount = () => {
        this.getCode();
        window.localStorage.setItem('hi', '0');
    }

    catchExit = () => {
        event.preventDefault();
        console.log('Bye-Bye');
        
    }

    postData = (url = '', data = '', context) => {
        // Значения по умолчанию обозначены знаком *
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
        .then(response => response.json())
        .then(function(response) {
            if (!response.access_token){
                console.log(`Error ${response.error}: ${response.error_description}`);
                context.setState({error: response.error_description});
                window.open(context.linkToGetCode, '_self');
            } else {
                context.setState({response});
            }
        });
    }

    prepareParams = (code) => {
        return `grant_type=authorization_code&code=${code}&client_id=${this.client_id}&client_secret=${this.client_secret}`;
    }

    getCode = () => {
        if (!this.state.response){
            let url = new URL('http://localhost:8000/' + window.location.search);
            let code = url.searchParams.get("code");
            this.postData('https://oauth.yandex.ru/token', this.prepareParams(code), this);    
        } else {
            console.log();
        }
    }

    render() {
        return (
            <>
                <div className={'main'}>
                    {this.state.response != null ? <Dashboard token={this.state.response} counterID={config.counter_id}/> : <p>{'Загрузка'}</p>}
                </div>            
            </>
        );
    }
}