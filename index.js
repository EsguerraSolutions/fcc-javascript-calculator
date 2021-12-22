class App extends React.Component {
    constructor(props) {
        super (props);
    }

    render() {
        return (
            <div id="header">
                <h1>Hello Cat</h1>
                <p>Are you dog</p>
            </div>
        );
    }
}

ReactDOM.render(<App/>,document.getElementById("root"));