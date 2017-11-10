import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


// a variable declared with const can not be changed
// a variable declared with let can be changed

// but if a variable is an array or object
// its value can get altered

const para = {
    text: "When you have a talking mouth, you dont have listening ears!"
};

class Hello extends React.Component {
    render(){

        para.iAmNewPara = "I can change you!";

        return(

            <div>

                <h2>{para.text}</h2>
                <p>{para.iAmNewPara}</p>

            </div>
        )
    }
}

ReactDOM.render(<Hello />, document.getElementById('root'));
registerServiceWorker();
