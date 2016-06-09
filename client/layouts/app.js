import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Alert from 'react-s-alert';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {ActiveRoute} from 'meteor/zimme:active-route';
import ChangePasswordModal from '../app-comps/change-password-modal';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChangePasswordModal: false
        }
    }

    render() {
        const {main, user} = this.props;

        return <div>
            <header>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#" onClick={this.goHome.bind(this)}>数字大战</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem active={ActiveRoute.name('rank')} href={FlowRouter.path('rank')}>排行榜</NavItem>
                            <NavItem active={ActiveRoute.name('game')} href={FlowRouter.path('game')}>战斗</NavItem>
                            <NavItem active={ActiveRoute.name('help')} href={FlowRouter.path('help')}>训练营</NavItem>
                        </Nav>
                        {
                            user && <Nav pullRight>
                                <NavDropdown title="设置" id="basic-nav-dropdown">
                                    <MenuItem href="#" onClick={()=>this.setState({showChangePasswordModal:true})}>修改密码</MenuItem>
                                    <MenuItem href="#" onClick={()=>Meteor.logout()}>退出</MenuItem>
                                    <ChangePasswordModal show={this.state.showChangePasswordModal} onClose={()=>this.setState({showChangePasswordModal:false})}/>
                                </NavDropdown>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Navbar>
            </header>

            <main>
                <div className="container">
                    {main}
                </div>
                <Alert stack={{limit: 3}} effect="scale" position="top-left"/>
            </main>

            <footer>

            </footer>
        </div>
    }

    goHome() {
        const {user} = this.props;
        if (user) {
            FlowRouter.go('game');
        }
        else {
            FlowRouter.go('login');
        }
    }
}

const Container = createContainer((props)=> {
    const user = Meteor.user();

    if (!Meteor.loggingIn() && !user && !ActiveRoute.name('login')) {
        FlowRouter.go('login');
    }

    return {
        user: user
    }
}, Layout);

export default Container