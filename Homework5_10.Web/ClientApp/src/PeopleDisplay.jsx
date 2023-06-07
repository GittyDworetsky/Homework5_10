import React from 'react';
import axios from 'axios';
import CreatePersonRow from './createPersonRow'
import AddPersonForm from './addPersonForm'
import 'bootstrap/dist/css/bootstrap.min.css';

class PeopleDisplay extends React.Component {


    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        inEditMode: false
    }

    generateTable = () => {

        const { people } = this.state;
        console.log(people.length);

        return people.map(p => (
                <CreatePersonRow
                    key={p.id}
                    person={p}
                    onEditClick={this.onEditClick}
                    onDeleteClick={this.onDeleteClick}
                    onCheck={this.onCheck}
                />
            ))
        
        

    }


    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    getAllPeople = () => {
        axios.get('/api/home/getall').then(res => {
            this.setState({ people: res.data});
        });
    }

    onAddClick = () => {
        axios.post('/api/home/add', this.state.person).then(() => {
            this.getAllPeople();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
        });
    }

    onEditClick = (p) => {
        //here i just change how the thing looks with the textboxes filled and different buttons for cancel and update
        const { firstName, lastName, age } = p;
        this.setState({
            person: {
                firstName,
                lastName,
                age
            },
            inEditMode: true
        })
    }

    onUpdateClick = () => {
        //once i click this should reset state person to empty and ineditmode to false

        axios.post('/api/home/update', this.state.person).then(() => {
            this.getAllPeople();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                },
                inEditMode: false
            });
        });
    }

    onCancelClick = () => {
    //on cancel should just empty boxes and inedit mode is false
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: ''
            },
            inEditMode: false
        });
    }

    onDeleteClick = (listInt) => {

        axios.post('/api/home/delete', listInt).then(() => {
            this.getAllPeople();
        });
    }









    render() {

        const { firstName, lastName, age } = this.state.person;

        return <>
            <div className='container mt-5'>
                <div className='row'>
                    <AddPersonForm
                        firstName={firstName}
                        lastName={lastName}
                        age={age}
                        onTextChange={this.onTextChange}
                        onAddClick={this.onAddClick}
                        inEditMode={this.state.inEditMode}
                        onUpdateClick={this.onUpdateClick}
                        onCancelClick={this.onCancelClick }
                    />
                </div>
                <div id="root">
                    <div className="container" style={{ marginTop: '60px' }}>

                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: '15%' }}>
                                        <button className="btn btn-danger w-100">Delete All</button>
                                        <button className="btn btn-outline-danger w-100 mt-2">Check All</button>
                                        <button className="btn btn-outline-danger w-100 mt-2">Uncheck All</button>
                                    </th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.generateTable }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    }
}
    export default PeopleDisplay;
