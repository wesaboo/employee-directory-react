import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import API from "./utils/API.js";
import Button from "./components/buttons/button";
import SearchForm from "./components/buttons/SearchForm";

class App extends Component {
  // Setting this.state.employees to the employees json array
  state = {
    employees: [],
    filter: "",
  };

  componentDidMount() {
    // After page load, make the API call
    API.getEmployees().then((results) => {
      this.setState({
        employees: results.data.results,
      });
    });
  }

  // Function to sort by first name, alphabetical in ascending order
  sortEmployees = (employees) => {
    const employeeSort = [...employees];
    employeeSort.sort(function (a, b) {
      if (a.name.first.toLowerCase() < b.name.first.toLowerCase()) return -1;
      if (a.name.first.toLowerCase() > b.name.first.toLowerCase()) return 1;
      return 0;
    });
    this.setState({ employees: employeeSort });
  };

  // Button Click to call sort function
  handleButtonClick = (event) => {
    event.preventDefault();
    this.sortEmployees(this.state.employees);
  };

  // Function to sort by first name, alphabetical in descending order
  sortReverseEmployees = (employees) => {
    const employeeSort = [...employees];
    employeeSort.sort(function (a, b) {
      if (a.name.first.toLowerCase() > b.name.first.toLowerCase()) return -1;
      if (a.name.first.toLowerCase() < b.name.first.toLowerCase()) return 1;
      return 0;
    });
    this.setState({ employees: employeeSort });
  };

  // Button Click to call sort function reverse
  handleButtonClick2 = (event) => {
    event.preventDefault();
    this.sortReverseEmployees(this.state.employees);
  };

  // onchange to set into state from input
  handleOnChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  // Onchange handler to filter employees
  filterEmployees = (event) => {
    event.preventDefault();
    if (!this.state.filter) {
      return;
    }
    const filtered = this.state.employees.filter(
      (employee) =>
        employee.name.first.toLowerCase() === this.state.filter.toLowerCase() ||
        employee.name.last.toLowerCase() === this.state.filter.toLowerCase()
    );
    this.setState({ employees: filtered });
  };

  // onclick to remove employeees
  removeEmployee = (id) => {
    // Filter this.state.employees for employees with an id not equal to the id being removed
    const employees = this.state.employees.filter(
      (employee) => employee.login.uuid !== id
    );
    // Set this.state.employees equal to the new employees array
    this.setState({ employees });
  };

  // Map over this.state.employees and render a FriendCard component for each employee object
  render() {
    return (
      <Wrapper>
        <Button
          handleButtonClick={this.handleButtonClick}
          class="btn btn-light"
        >
          Sort Ascending
        </Button>
        <Button
          handleButtonClick={this.handleButtonClick2}
          class="btn btn-dark"
        >
          Sort Descending
        </Button>
        <Title>Employee Directory</Title>
        <SearchForm
          handleOnChange={this.handleOnChange}
          filter={this.state.filter}
          filterEmployees={this.filterEmployees}
        />
        {this.state.employees.map((employee) => (
          <FriendCard
            removeEmployee={this.removeEmployee}
            id={employee.login.uuid}
            key={employee.login.uuid}
            name={employee.name.first + " " + employee.name.last}
            image={employee.picture.medium}
            email={employee.email}
            location={
              employee.location.street.number +
              " " +
              employee.location.street.name +
              ", " +
              employee.location.city +
              ", " +
              employee.location.state +
              " " +
              employee.location.postcode
            }
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
