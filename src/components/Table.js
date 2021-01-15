import React from "react";
import Moment from "react-moment";
import "./style.css";


function Table(props) {
    console.log(props.state)
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col-2"></th>
                        <th scope="col" onClick={props.sortByName}>Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    {props.employees.map(employee => (
                        <tr key={employee.login.uuid}>
                            <td><img src={employee.picture.medium} alt={employee.name.first} /></td>
                            <td>{employee.name.title + ". " + employee.name.first + " " + employee.name.last}</td>
                            <td>{employee.phone}</td>
                            <td className="email"><a href={employee.email}>{employee.email}</a></td>
                            <td><Moment format="MM/DD/YYYY">{employee.dob.date}</Moment></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    );

};

export default Table;