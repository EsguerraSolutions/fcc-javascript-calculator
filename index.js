const keypadArr = [
    {
        keyCode1 : 103,
        keyCode2 : 55,
        keyID : "seven",
        keyValue : "7",
        keyType : "digit"
    },
    {
        keyCode1 : 104,
        keyCode2 : 56,
        keyID : "eight",
        keyValue : "8",
        keyType : "digit"
    },
    {
        keyCode1 : 105,
        keyCode2 : 57,
        keyID : "nine",
        keyValue : "9",
        keyType : "digit"
    },
    {
        keyCode1 : 8,
        keyID : "backspace",
        keyValue : "DEL",
        keyType : "control"
    },
    {
        keyCode1 : 27,
        keyID : "clear",
        keyValue : "CLR",
        keyType : "control"
    },
    {
        keyCode1 : 100,
        keyCode2 : 52,
        keyID : "four",
        keyValue : "4",
        keyType : "digit"
    },
    {
        keyCode1 : 101,
        keyCode2 : 53,
        keyID : "five",
        keyValue : "5",
        keyType : "digit"
    },
    {
        keyCode1 : 102,
        keyCode2 : 54,
        keyID : "six",
        keyValue : "6",
        keyType : "digit"
    },
    {
        keyCode1 : 106,
        keyShiftCode : 56,
        keyID : "multiply",
        keyValue : "*",
        keyType : "operator"
    },
    {
        keyCode1 : 111,
        keyCode2 : 191,
        keyID : "divide",
        keyValue : "/",
        keyType : "operator"
    },
    {
        keyCode1 : 97,
        keyCode2 : 49,
        keyID : "one",
        keyValue : "1",
        keyType : "digit"
    },
    {
        keyCode1 : 98,
        keyCode2 : 50,
        keyID : "two",
        keyValue : "2",
        keyType : "digit"
    },
    {
        keyCode1 : 99,
        keyCode2 : 51,
        keyID : "three",
        keyValue : "3",
        keyType : "digit"
    },
    {
        keyCode1 : 107,
        keyShiftCode : 187,
        keyID : "add",
        keyValue : "+",
        keyType : "operator"
    },
    {
        keyCode1 : 109,
        keyCode2 : 189,
        keyID : "subtract",
        keyValue : "-",
        keyType : "operator"
    },
    {
        keyCode1 : 96,
        keyCode2 : 48,
        keyID : "zero",
        keyValue : "0",
        keyType : "digit"
    },
    {
        keyCode1 : 110,
        keyCode2 : 190,
        keyID : "decimal",
        keyValue : ".",
        keyType : "digit"
    },
    {
        keyShiftCode : 57,
        keyID : "open-parenthesis",
        keyValue : "(",
        keyType : "parenthesis"
    },
    {
        keyShiftCode : 48,
        keyID : "close-parenthesis",
        keyValue : ")",
        keyType : "parenthesis"
    },
    {
        keyCode1 : 13,
        keyCode2 : 187,
        keyID : "equals",
        keyValue : "=",
        keyType : "equals"
    }
]

const initialState = {
    input: String.fromCharCode(160),
    output: 0,
    result: 0,
    previousKeyType: "",
    decimalLimit: 0,
    operatorLimit: 0,
    power : true
}

const pressedStyle = {
    boxShadow: "0 0 0 black"
}

const releasedStyle = {
    boxShadow: "rgba(0, 0, 0, 1) 2px 2px 2.6px"
}

class App extends React.Component {
    constructor(props) {
        super (props);
        this.state = initialState;
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeOutput = this.handleChangeOutput.bind(this);
        this.computeOutput = this.computeOutput.bind(this);
        this.setPreviousKeyType = this.setPreviousKeyType.bind(this);
        this.decimalLimiter = this.decimalLimiter.bind(this);
        this.operatorLimiter = this.operatorLimiter.bind(this);
        this.setPower = this.setPower.bind(this);
    }

    handleChangeInput(n,t) {

        /*PRESSING CLEAR BUTTON*/
        if (n == "CLR") {
            this.setState(initialState);
        }

        /*PRESSING DEL BUTTON*/
        else if (n == "DEL") {
            if (this.state.input.length > 1) {
                this.setState((state) => ({
                    input : state.input.slice(0,-1)
                }));
            }

            else {
                this.setState({
                    input : initialState.input
                });
            }
        }
        
        /*PRESSING OPERATORS*/
        else if (t == "operator") {
            if(this.state.previousKeyType == "equals") {
                this.setState((state) => ({
                    input : state.result + n,
                }));
                this.operatorLimiter();
            }

            else if(this.state.previousKeyType == "operator") {
                if(n != "-" && this.state.operatorLimit < 2) {
                    this.setState((state) => ({
                        input : state.input.slice(0,-1) + n
                    }));
                }

                else if (this.state.operatorLimit < 2) {
                    this.setState((state) => ({
                        input : state.input + n,
                    }));
                    this.operatorLimiter();
                }

                else {
                    this.setState((state) => ({
                        input : state.input.slice(0,-2) + n,
                        operatorLimit : 1
                    }));
                }
            }

            else {
                this.setState((state) => ({
                    input : state.input + n
                }));
                this.operatorLimiter();
            }
        }

        /*PRESSING DECIMAL & DECIMAL LIMITER*/
        else if (n == ".") {
            if(this.state.decimalLimit == 0) {
                this.setState((state) => ({
                    input : state.input + n
                }));
            }

            else {
                this.setState((state) => ({
                    input : state.input
                }));
            }
        }

        /*PRESSING OTHERS*/
        else {
            if (this.state.input != initialState.input && this.state.previousKeyType != "equals") {
                this.setState((state) => ({
                    input : state.input + n
                }));
            }

            else {
                this.setState((state) => ({
                    input : n
                }));
            }
        }
    }

    setPreviousKeyType(t) {
        this.setState({
            previousKeyType : t
        });

        //RESET DECIMAL LIMIT
        if(t != "digit") {
            this.setState({
                decimalLimit : 0
            });
        }

        //RESET OPERATOR LIMIT
        if(t != "operator") {
            this.setState({
                operatorLimit : 0
            });
        }
    }

    decimalLimiter() {
        this.setState((state) => ({
            decimalLimit : state.decimalLimit + 1
        }));
    }

    operatorLimiter() {
        this.setState((state) => ({
            operatorLimit : state.operatorLimit + 1
        }));
    }

    handleChangeOutput(n,t) {
        /*PRESSING CLEAR BUTTON*/
        if (n == "CLR") {
            this.setState(initialState);
        }

        /*PRESSING DEL BUTTON*/
        else if (n == "DEL") {
            if (this.state.output.length > 1) {
                this.setState((state) => ({
                    output : state.output.slice(0,-1)
                }));
            }

            else {
                this.setState({
                    output : initialState.output
                });
            }
        }

        /*PRESSING NEW TYPE OF KEY*/
        else if (this.state.previousKeyType != t) {
            this.setState({
                output : n
            });
        }

        /*PRESSING OPERATOR CONSECUTIVELY*/
        else if (t == "operator") {
            this.setState({
                output : n
            });
        }

        /*PRESSING DECIMAL & DECIMAL LIMITER*/
        else if (n == ".") {
            if(this.state.decimalLimit == 0) {
                this.setState((state) => ({
                    output : state.output + n
                }));
            }

            else {
                this.setState((state) => ({
                    output : state.output
                }));
            }
        }

        /*PRESSING OTHERS*/
        else {
            if (this.state.output != initialState.output) {
                this.setState((state) => ({
                    output : state.output + n
                }));
            }

            else {
                this.setState((state) => ({
                    output : n
                }));
            }
        }
    }

    computeOutput() {
        if(this.state.input != initialState.input) {
          this.setState({
              result : eval(this.state.input),
              output : eval(this.state.input)
          });
        }
    }

    setPower() {
        if(this.state.power) {
            this.setState({
                power : false,
                input: String.fromCharCode(160),
                output: String.fromCharCode(160)
            });
        }

        else {
            this.setState(initialState);
        }
    }

    render() {
        const {input,output,power} = this.state;
        return (
            <div id="container">
                <div id="box">
                    <div id="header">
                        <h2>Javascript Calculator</h2>
                        <p>Coded by Jonathan</p>
                    </div>
                    <Display input={input} output={output} power={power}/>
                    <PowerButton setPower={this.setPower} power={power}/>
                    <Keypad input={input} handleChangeInput={this.handleChangeInput} handleChangeOutput={this.handleChangeOutput} computeOutput={this.computeOutput} setPreviousKeyType={this.setPreviousKeyType} decimalLimiter={this.decimalLimiter} power={power}/>
                </div>
            </div>
        );
    }
}

class Display extends React.Component {
    constructor(props) {
        super (props);
    }

    render() {
        const {input,output,power} = this.props; 
        const displayBoxStyle = {
            backgroundColor : "var(--light-gray)"
        }
        power ? displayBoxStyle.backgroundColor = "var(--light-gray)" : displayBoxStyle.backgroundColor = "var(--semi-dark-gray)";

        return (
            <div id="display-box" style={displayBoxStyle}>
                <div id="input">{input}</div>
                <div id="display">{output}</div>
            </div>
        );
    }
}

class PowerButton extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.setPower();
    }

    render() { 
        let powerSwitchStyle = {
                justifyContent : "flex-end"
            }
            
        if (this.props.power) {
            powerSwitchStyle.justifyContent = "flex-start"   
        }
        
        else {
            powerSwitchStyle.justifyContent = "flex-end"        
        }
      return (
        <div className="switch-container">
            <p>ON</p>
            <div className="switch" onClick={this.handleClick} style={powerSwitchStyle}>
                <div className="button">{String.fromCharCode(160)}</div>
            </div>
            <p>OFF</p>
        </div>
      );
    }
}

class Keypad extends React.Component {
    constructor(props) {
        super (props);
    }

    render() {
        const {input,handleChangeInput,handleChangeOutput,computeOutput,setPreviousKeyType,decimalLimiter,power} = this.props;
        return (
            <div id="keypad">
                {keypadArr.map((key) => <Key keyCode1={key.keyCode1} keyCode2={key.keyCode2} keyShiftCode={key.keyShiftCode} keyID={key.keyID} keyValue={key.keyValue} keyType={key.keyType} input={input} handleChangeInput={handleChangeInput} handleChangeOutput={handleChangeOutput} computeOutput={computeOutput} setPreviousKeyType={setPreviousKeyType} decimalLimiter={decimalLimiter} power={power}/>)}
            </div>
        );
    }
}

class Key extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            padStyle : releasedStyle
        }
        this.handleClick = this.handleClick.bind(this);
        this.pressPad = this.pressPad.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentDidMount() {
        document.addEventListener("keydown",this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown",this.handleKeyPress);
    }

    handleClick() {
        /*CHECK POWER*/
        if(this.props.power) {
        /*IF EQUALS KEY IS PRESSED*/
            if(this.props.keyValue == "=") {
                this.props.computeOutput();
            }

            /*IF OTHER KEYS ARE PRESSED*/
            else {
                this.props.handleChangeInput(this.props.keyValue,this.props.keyType);
                this.props.handleChangeOutput(this.props.keyValue,this.props.keyType);
            }

            /*IF DECIMAL KEY IS PRESSED, INCREMENT DECIMAL LIMIT BY 1*/
            if(this.props.keyValue == ".") {
                this.props.decimalLimiter();
            }
        }
        
        this.pressPad();
        setTimeout(() => this.pressPad(), 100);
        this.props.setPreviousKeyType(this.props.keyType);
    }

    pressPad() {
        if(this.state.padStyle.boxShadow === "0 0 0 black") {
            this.setState({
                padStyle : releasedStyle
            });
        }

        else {
            this.setState({
                padStyle : pressedStyle
            });
        }
    }

    handleKeyPress(e) {
        /*CHECK POWER*/
        if(this.props.power) {
            if(e.keyCode === this.props.keyCode1 && e.shiftKey === false) {
                this.handleClick();
            }

            else if(e.keyCode === this.props.keyCode2 && e.shiftKey === false) {
                this.handleClick();
            }

            else if(e.keyCode === this.props.keyShiftCode && e.shiftKey) {
                this.handleClick();
            }
        }
    }


    render() {
        const {keyID,keyValue} = this.props;
        const {padStyle} = this.state;
        return (
            <div className="key" id={keyID} onClick={this.handleClick} style={padStyle}>
                {keyValue}
            </div>
        );
    }
}

ReactDOM.render(<App/>,document.getElementById("root"));