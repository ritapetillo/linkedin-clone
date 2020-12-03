import { Col, Container, ListGroup, Row, Button } from "react-bootstrap";

import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import "../Styles/connections.css"

class Connections extends Component {
  state = {
    allUsers: [],
  };

  fetchAllUsers = async () => {
    const {
      REACT_APP_PROFILE,
      REACT_APP_TOKEN,
      REACT_APP_PROFILELIST,
    } = process.env;
    console.log(REACT_APP_PROFILE);
    try {
      const res = await fetch(REACT_APP_PROFILELIST, {
        headers: {
          Authorization: "Bearer " + REACT_APP_TOKEN,
        },
      });
      if (res.ok) {
        let users = await res.json();
        this.setState({ allUsers: users });
        console.log(users);
      } else {
        console.log("there is an error");
      }
    } catch (err) {
      console.log("there is an error");
    }
  };
  componentDidMount() {
    this.fetchAllUsers();
  }
  render() {
    return (
      <Container className="container-conn mb-5">
        <ListGroup className="connections-list">
            <ListGroup.Item><p className="text-muted results">{this.state.allUsers.length} results</p></ListGroup.Item>
          {this.state.allUsers.map((user) => (
            <ListGroup.Item className="connections-item">
                <Row className="conn-row">
                    <Col md={2}lg={1} className="avatar-col">
                        <Avatar alt={user.image} src={user.image} />
                    </Col>
                    <Col md={3} lg={3} className="info-col" >
                        <Row className="name-col">{user.name} {user.surname}</Row>
                        <Row className="title-col">{user.title}</Row>  
                        <Row className="area-col text-muted"> {user.area}</Row> 
                    </Col>

                        <Button className="message-btn">Message</Button>
                </Row>
              
              
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

export default Connections;