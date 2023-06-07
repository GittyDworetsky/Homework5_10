
import React from 'react';

const CreatePersonRow = ({ person, onEditClick, onDeleteClick, onCheck }) => {

    const { firstName, lastName, age, id } = person;
    return (
        <tr key={id}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button onClick={() => onEditClick(person)}>Edit</button>
                <button onClick={() => onDeleteClick([id])}>Delete</button>
            </td>
        </tr>
    );
};

export default CreatePersonRow;
