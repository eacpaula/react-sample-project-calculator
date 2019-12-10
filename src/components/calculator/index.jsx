import React from "react";
import './index.css'
import Button from "../button";
import Display from "../display";

const initialState = {
    value: 0,
    values: [0, 0],
    clear: false,
    operation: null,
    index: 0
}

export default class Calculator extends React.Component {
    constructor(){
        super()

        this.state = { ...initialState };

        this.reset = this.reset.bind(this)
        this.operation = this.operation.bind(this)
        this.add = this.add.bind(this)
    }

    reset = () => {
        this.setState({...initialState})
    }

    operation = (operation) => {
        const values = [...this.state.values]
        
        if(this.state.index === 0) {
            this.setState({
                operation: operation,
                clear: true,
                index: 1
            })
        } else {
            values[0] = this.calculate(values, this.state.operation)
            values[1] = 0 

            this.setState({
                value: values[0],
                values,
                operation: operation === '=' ? null : operation,
                index: operation === '=' ? 0 : 1,
                clear: true
            })
        }


    }

    calculate = (values, operation) => {
        let result = 0
        switch (operation) {
            case '+':
                result = values[0] + values[1];
                break;
            case '-':
                result = values[0] - values[1];
                break;
            case '/':
                result = values[0] / values[1];
                break;
            case '*':
                result = values[0] * values[1];
                break;
            default:
                result = values[0]
        }

        return result
    }

    add = (digit) => {
        if(digit === '.' && this.state.value.includes('.')) {
            return
        }

        const values = [...this.state.values]
        const clear = this.state.value === '0' || this.state.value === 0 || this.state.clear
        const currentValue = clear ? '' : this.state.value
        const value = currentValue + digit

        if(digit !== '.') {
            values[this.state.index] = parseFloat(value)
        }

        this.setState({
            value,
            values,
            clear: false
        })
    }

    render(){

        return (
            <div id="calculator">
                <Display value={this.state.value}/>
                <Button value="AC" click={this.reset} cols={3}/>
                <Button value="/" click={this.operation} operation/>
                <Button value="7" click={this.add} />
                <Button value="8" click={this.add} />
                <Button value="9" click={this.add} />
                <Button value="*" click={this.operation} operation/>
                <Button value="4" click={this.add} />
                <Button value="5" click={this.add} />
                <Button value="6" click={this.add} />
                <Button value="-" click={this.operation} operation/>
                <Button value="1" click={this.add} />
                <Button value="2" click={this.add} />
                <Button value="3" click={this.add} />
                <Button value="+" click={this.operation} operation/>
                <Button value="0"  click={this.add} cols={2}/>
                <Button value="." click={this.add} />
                <Button value="=" click={this.operation} operation/>
            </div>
        )
    }
}