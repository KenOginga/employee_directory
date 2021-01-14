import React, { Component } from "react";
import API from "../utils/API";
import Moment from "react-moment";
import "./style.css";


class Table extends Component {
    state = {
        employees: [],
        sortedEmployees: [],
        search: ""
    }

    componentDidMount() {
        API.getEmployees()
            .then(employeesData => this.setState({ employees: employeesData.data.results }))
            .then(employees => this.setState({ sortedEmployees: this.state.employees }))
            .then(res => console.log(this.state.employees))
    }

    // sortByName = ()=>{
    //     const sort = sfsf
    // }
    render() {

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col-2"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.employees.map(employee => (
                            <tr>
                                <td><img src={employee.picture.medium} alt={employee.name.first}/></td>
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
    }
};

export default Table;