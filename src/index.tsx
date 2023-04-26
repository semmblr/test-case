import React, { Component } from "react";
import { Form, Input, Button, Card } from "antd";
import ReactDOM from "react-dom";
import "../tailwind.config.js";
import "../index.css";

interface User {
  name: string;
  surname: string;
  address: string;
}

interface AppState {
  users: User[];
}

const nameRegex = /^[a-zA-Z]+$/;
const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;

interface InputProps {
  label: string;
  name: string;
  regex: RegExp;
  required: boolean;
}

class CustomInput extends Component<InputProps> {
  render() {
    const { label, name, regex, required } = this.props;
    return (
      <Form.Item
        label={label}
        name={name}
        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:ring-indigo-200"
        rules={[
          { required: required, message: `Please enter your ${name}!` },
          {
            pattern: regex,
            message: `Please enter a valid ${name}!`,
          },
        ]}
      >
        <Input />
      </Form.Item>
    );
  }
}

interface CustomButtonProps {
  label: string;
}

class CustomButton extends Component<CustomButtonProps> {
  handleClick = () => {
    // this.props.form.submit();
  };

  render() {
    const { label } = this.props;

    return (
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          htmlType="submit"
          type="primary"
          onClick={this.handleClick}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {label}
        </Button>
      </Form.Item>
    );
  }
}
class CreateUser extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      users: [],
    };
  }
  handleSubmit = (values: any) => {
    const newUser = {
      name: values.name,
      surname: values.surname,
      address: values.address,
    };
    this.setState({ users: [...this.state.users, newUser] });
  };

  render() {
    return (
      <div className="App">
        <Form onFinish={this.handleSubmit} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }}>
          <CustomInput label="Name" name="name" regex={nameRegex} required />
          <CustomInput label="Surname" name="surname" regex={nameRegex} required />
          <CustomInput label="Address" name="address" regex={addressRegex} required />
          <CustomButton label="Submit" />
        </Form>
        <div className="CardContainer">
          {this.state.users.map((user, index) => (
            <Card key={index} style={{ width: "300px", margin: "20px" }}>
              <p className="text-sm font-medium text-gray-900">Name: {user.name}</p>
              <p className="text-sm font-medium text-gray-900">Surname: {user.surname}</p>
              <p className="text-sm text-gray-500">Address: {user.address}</p>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<CreateUser />, document.getElementById("root"));
