import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/'
import Order from '../../views/Order/Order'
import Member from '../../views/Member/Member'
import Stock from '../../views/Stock/Stock'
import Product from '../../views/Product/Product'

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/home/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/home/order" name="order" component={Order}/>
                <Route path="/home/member" name="member" component={Member}/>
                <Route path="/home/stock" name="stock" component={Stock}/>
                <Route path="/home/product" name="product" component={Product}/>
                {/* <Redirect from="/home" to="/home/dashboard"/> */}
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
