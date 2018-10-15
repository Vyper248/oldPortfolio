import React, { Component } from 'react';

class ErrorBoundry extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        };
    }
    
    componentDidCatch(error, info){
        this.setState({ hasError: true});
    }
    
    render(){
        if (this.state.hasErro){
            return <h1>Ooops, error detected, abort.. abort!!!</h1>
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundry;