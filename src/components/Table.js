import React, { Component } from "react";
import API from "../utils/API";
import Moment from "react-moment";
import "./style.css";


class Table extends Component {
    // Setting component's initial state
    state = {
        employees: [],
        filteredEmployees: [],
        search: "",
        order: ""
    }

    componentDidMount() {
        API.getEmployees()
            .then(employeesData => this.setState({ employees: employeesData.data.results }))
            .then(employees => this.setState({ filteredEmployees: this.state.employees }))
    };
    
    handleInputChange = (event) => {
        const employeeName = event.target.value;
        const searchedEmployeeArray = this.state.employees.filter(employee => employee.name.first.includes(employeeName) || employee.name.last.includes(employeeName));
        this.setState({ filteredEmployees: searchedEmployeeArray})
    };

    sortByName = ()=>{
        const sortingList = this.state.filteredEmployees;
        if (this.state.order === "asc"){
            const sortedNames = sortingList.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1);
            this.setState({
                filteredEmployees: sortedNames,
                order: "desc"
            });
        } else {
            const sortedNames = sortingList.sort((a, b) => (a.name.first > b.name.first) ? -1 : 1);
            this.setState({
                filteredEmployees: sortedNames,
                order: "asc"
            })
        }
    };

    render() {

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col-2"></th>
                            <th scope="col" onClick={this.sortByName}>Name</th>
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