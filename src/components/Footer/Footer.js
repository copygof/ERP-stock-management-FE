import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <span><a href="">Stock </a> &copy; 2017 manager you product.</span>
        <span className="ml-auto">Powered by <a>Lesszy Team</a></span>
        {/* <span><a href="http://coreui.io">CoreUI</a> &copy; 2017 creativeLabs.</span>
        <span className="ml-auto">Powered by <a href="http://coreui.io">CoreUI</a></span> */}
      </footer>
    )
  }
}

export default Footer;