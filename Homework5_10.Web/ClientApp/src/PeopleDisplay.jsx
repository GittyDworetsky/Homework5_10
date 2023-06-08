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
        inEditMode: false,
        currentEditId: 0,
        idsToDelete: []
    }

    componentDidMount = () => {
        this.refreshPeople();
    }

    refreshPeople = () => {
        axios.get('/api/home/getall').then(response => {
            const people = response.data;
            this.setState({ people });
        });
     
    }


    onCheckChange = (id) => {

        const idsToDelete = this.state;
        let newIdsToDelete;
        if (!idsToDelete.includes(id)) {
            newIdsToDelete = [...idsToDelete, id]
        } else {
           newIdsToDelete = idsToDelete.filter(i => i !== id);

        }

        this.setState({ idsToDelete: newIdsToDelete });

    }

    onDeleteMany = () => {
        const ids = this.state.idsToDelete;
        axios.post('/api/people/deletemany', { ids }).then(response => {
            this.refreshPeople();

        });
    }

   

    onCheckAll = () => {

        this.setState({ idsToDelete: this.state.people.map(p => p.id) });
    }

    onUncheckAll = () => {

        this.setState({ idsToDelete: []});

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
            this.refreshPeople();
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
        const { firstName, lastName, age, id } = p;

        this.setState({
            person: {
                firstName,
                lastName,
                age,
                
            },
            inEditMode: true,
            currentEditId: id,
            allChecked: false
           
        })
    }

    onUpdateClick = () => {
        //once i click this should reset state person to empty and ineditmode to false
        const { person, currentEditId } = this.state;
        axios.post('/api/home/update', { ...person, currentEditId } ).then(() => {
            this.refreshPeople();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                },
                inEditMode: false,
                currentEditId: 0

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

    onDeleteClick = id => {

        axios.post('/api/home/delete', {id}).then(() => {
            this.refreshPeople();
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
                        onCancelClick={this.onCancelClick}
                        
                    />
                </div>
                <div id="root">
                    <div className="container" style={{ marginTop: '60px' }}>

                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: '15%' }}>
                                        <button className="btn btn-danger w-100" onClick={this.onDeleteMany}>Delete All</button>
                                        <button className="btn btn-outline-danger w-100 mt-2" onClick={this.onCheckAll}>Check All</button>
                                        <button className="btn btn-outline-danger w-100 mt-2" onClick={this.onUncheckAll}>Uncheck All</button>
                                    </th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.people.map(p =>
                                    <CreatePersonRow
                                        key={p.id}
                                        person={p}
                                        onEditClick={() => this.onEditClick(p)}
                                        onDeleteClick={() => this.onDeleteClick(p.id)}
                                        onCheck={this.state.idsToDelete.includes(p.id)}
                                        onCheckChange={() => this.onCheckChange(p.id)}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    }
}
    export default PeopleDisplay;
