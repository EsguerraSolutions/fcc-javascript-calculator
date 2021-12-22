class App extends React.Component {
    constructor(props) {
        super (props);
    }

    render() {
        return (
            <div id="header">
                <h1>Hello World!</h1>
            </div>
        );
    }
}

ReactDOM.render(<App/>,document.getElementById("root"));