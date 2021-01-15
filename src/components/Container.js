import React, { Component } from "react";
import Header from "./Header";
import Table from "./Table";
import "./style.css";
import API from "../utils/API";

class Container extends Component {
    // Setting component's initial state
    state = {
        employees: [],
        filteredEmployees: [],
        search: "",
        order: ""
    };

    componentDidMount() {
        API.getEmployees()
            .then(employeesData => this.setState({
                employees: employeesData.data.results,
                filteredEmployees: employeesData.data.results
            }))
            .catch(err => console.log(err))
    };

    // 
    handleInputChange = (event) => {
        const employees = this.state.employees;
        const userInput = event.target.value;
        const filteredEmployees = employees.filter(employee => employee.name.first.toLowerCase().indexOf(userInput.toLowerCase()) > -1);
        // change the state of filtered employees to hold what matches the user's
        this.setState({ filteredEmployees });
    };

    // upon clicking the search button
    handleSearch = (event) => {
        event.preventDefault();
        if (!this.state.search) {
            alert("Enter Employee Name!")
        }
        const { employees, search } = this.state
        const searchedEmployees = employees.filter(employee => employee.name.first.toLowerCase().includes(search.toLowerCase()));
        this.setState({ searchedEmployees })
    };

    sortByName = () => {
        const sortingList = this.state.filteredEmployees;
        if (this.state.order === "asc") {
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
        };
    };
    
    // The render method returns the JSX that should be rendered
    render() {
        return (
            <div>
                <Header
                    employees={this.state.employees}
                    handleSearch={this.handleSearch}
                    handleInputChange={this.handleInputChange}
                />
                <Table
                    employees={this.state.filteredEmployees}
                    sortByName={this.sortByName}
                />
            </div>
        );
    };
};

export default Container;