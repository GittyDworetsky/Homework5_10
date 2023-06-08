import React from 'react';

const CreatePersonRow = ({ person, onEditClick, onDeleteClick, onCheck, onCheckChange }) => {
    const { firstName, lastName, age, id } = person;

    return (
        <tr key={id}>
            <td>
                <input checked={onCheck } type="checkbox" className="form-check-input" onChange={onCheckChange}/>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className="btn btn-warning" style={{ marginLeft: '10px' }} onClick={() => onEditClick(person)}>
                    Edit
                </button>
                <button className="btn btn-danger" onClick={() => onDeleteClick([id])}>
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default CreatePersonRow;
