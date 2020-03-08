import React, { Component } from 'react';
import axios from '../axios'

export default class FormDataComponent extends Component {
    userData;

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePatreonLink = this.onChangePatreonLink.bind(this);
        this.onChangeEmployer = this.onChangeEmployer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            patreonLink: '',
            employer: '',
            signedUp: false
        }
    }

    // Form Values
    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangePatreonLink(e) {
        this.setState({ patreonLink: e.target.value })
    }

    onChangeEmployer(e) {
        this.setState({ employer: e.target.value })
    }

    // React Life Cycle
    componentDidMount() {
        this.userData = JSON.parse(localStorage.getItem('user'));

        if (localStorage.getItem('signedUp') === 'true') {
            this.setState({
                signedUp: true
            });
        }
        this.setState({
            name: this.userData.name,
            patreonLink: this.userData.patreonLink,
            employer: this.userData.employer
        })
    }

    componentWillUpdate(nextProps, nextState) {
        
    }

    onSubmit=(e)=> {
        e.preventDefault()
        console.log(this.state)
        axios.post('/journalist', {
            journalist: {
                name: this.state.name,
                patreonLink: this.state.patreonLink,
                employer: this.state.employer
            }
        })
        .then(res => {
            localStorage.setItem('signedUp', 'true');
            console.log(res.data);
        })
        .catch(err => {
            console.log(err)
        });
    }


    render() {
        console.log(this.state.patreonLink);
        return (
            <div className="container">
                <h1 style={{textAlign: 'center', margin: '80px 0'}}>Sign Up</h1>
                <form onSubmit={this.onSubmit} style={{maxWidth: '400px', margin: 'auto'}}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Patreon Link</label>
                        <input type="text" className="form-control" value={this.state.patreonLink} onChange={this.onChangePatreonLink} />
                    </div>
                    <div className="form-group">
                        <label>Current Employer</label>
                        <input type="text" className="form-control" value={this.state.employer} onChange={this.onChangeEmployer} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={this.state.name.length < 4 ||this.state.employer.length < 4}>Submit</button>
                </form>
            </div>
        )
    }
}