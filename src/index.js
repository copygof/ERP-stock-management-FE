import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Full from './containers/Full/'
import Login from './Page/Login'

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route path="/home" name="Home" component={Full}/>
      <Route path="/" name="Login" component={Login}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'));



// React.Component.prototype.setState = function (partialState, callback) {
//   console.log(this.constructor.name)
//   console.log(this)

//   !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
//   this.updater.enqueueSetState(this, partialState, callback, 'setState');
// }

// class TodoList extends React.Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       list: []
//     }
//   }

//   componentDidMount() {
//     // console.log('componentDidMount')
//   }

//   shouldComponentUpdate() {
//     return true
//   }

//   handleClick() {
//     this.setState({
//       list: [...this.state.list, 'Items ' + this.state.list.length]
//     })
//   }

//   handleRemove(value) {
//     this.setState({
//       list: this.state.list.filter(v => v !== value)
//     })
//   }

//   render() {
//     return (
//       <div>
//         <div id='container' />
//         <ul>
//           {this.state.list.map((value, index) => (
//             <li key={index}>
//               <span>{value}</span>
//               <button onClick={() =>this.handleRemove(value)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//         <button onClick={() =>this.handleClick()}>Add To List</button>
//       </div>
//     )
//   }
// }

// class Copygof extends React.Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       list: []
//     }
//   }


//   componentDidMount() {
//     // console.log('componentDidMount')
//   }

//   shouldComponentUpdate() {
//     return true
//   }


//   handleClick() {
//     this.setState({
//       list: [...this.state.list, 'Items ' + this.state.list.length]
//     })
//   }

//   handleRemove(value) {
//     this.setState({
//       list: this.state.list.filter(v => v !== value)
//     })
//   }

//   render() {
//     return (
//       <div>
//         <div id='container' />
//         <ul>
//           {this.state.list.map((value, index) => (
//             <li key={index}>
//               <span>{value}</span>
//               <button onClick={() =>this.handleRemove(value)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//         <button onClick={() =>this.handleClick()}>Add To List</button>
//       </div>
//     )
//   }
// }

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <span>My App</span>
//         <TodoList />
//         <Copygof />
//       </div>
//     )
//   }
// }


// ReactDOM.render((
//   <App />
// ), document.getElementById('root'));