import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Modal, Button } from "react-bootstrap";
import { postNewEdu, editEdu, deleteEdu } from "../Lib/fetches/education";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import AddIcon from "@material-ui/icons/Add";

const EducationModal = ({
toggleEduModal,
  showModal,
  userId,
  selectedEducation,
}) => {
  const [state, setState] = useState({
    validated: false,
    setValidated: false,
    education: {
      school: "",
      degree: "",
      fieldOfStudy: "",
      description: "",
      activtiesSocieties: "",
      startYear: "",
      endYear: "",
    },
    selectedEducation: "",
    image: "",
  });

  useEffect(() => {
    console.log("selectedEducation", selectedEducation);
    if (selectedEducation || selectedEducation !== []) {
    //   delete selectedEducation.__v;
      setState({ education: selectedEducation });
    }
  }, [selectedEducation]);

  const updateEdu = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setState({ validated: true });
    }
  };
  const handleChangeImage = e => {
    console.log(e.target.files[0]);
    setState({ image: e.target.files[0] });
  };
  const handleChange = e => {
    let newEducation = { ...state.education };
    newEducation[e.target.name] = e.target.value;
    setState({ education: newEducation });
    console.log(state.education);
  };

  const handleSubmit = async e => {
    e.preventDefault(e);
    let res = "";
    let message = "There was an error with your submission";
    if (selectedEducation === "") {
      res = await postNewEdu(state.education);
      message = "New education created";
    } else {
      console.log(selectedEducation);
      res = await editEdu(state.education._id, state.education);
      message = "Your education has been edited";
    }
    alert(message);
    setState({ image: "" });
    toggleEduModal();
  };

  const handleDelete = async () => {
    console.log("clicke");
    try {
      const res = await deleteEdu(state.education._id);
      console.log("deleted");
      if (res.ok) {
        alert("Education deleted");
        toggleEduModal("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={toggleEduModal}
      backdrop="static"
      keyboard={false}
    >
      <Form onSubmit={e => handleSubmit(e)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEducation !== "" ? "Edit Education" : "Add Education"}
          </Modal.Title>
        </Modal.Header>
        <Container className="text-body mt-5">
          <Form.Text className="text-muted">Title *</Form.Text>
          <Form.Group>
            <Form.Control
              required
              type="text"
              placeholder="Ex: Harvard University"
              name="school"
              value={state.education && state.education.school}
              onChange={e => {
                handleChange(e);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
       
          <Form.Text className="text-muted">Degree *</Form.Text>
          <Form.Group>
            <Form.Control
              required
              type="text"
              placeholder="Ex: Master's Degree"
              name="company"
              value={state.education && state.education.degree}
              onChange={e => {
                handleChange(e);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Text className="text-muted">Field of Study *</Form.Text>
          <Form.Group>
            <Form.Control
              required
              type="text"
              placeholder="Ex: Art History"
              name="fieldOfStudy"
              value={state.education && state.education.fieldOfStudy}
              onChange={e => {
                handleChange(e);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="I am currently working in this role"
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Text className="text-muted">Start Year (YYYY) * </Form.Text>

              <Form.Group>
                <Form.Control
                  type="number"
                  name="startYear"
                  value={
                    state.education &&
                    state.education.startYear
                  }
                  onChange={e => {
                    handleChange(e);
                  }}
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Text className="text-muted">End Date / Expected End Date (YYYY) * </Form.Text>

              <Form.Group>
                <Form.Control
                  type="number"
                  name="endYear"
                  value={
                    state.education &&
                    state.education.endYear 
                  }
                  onChange={e => {
                    handleChange(e);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Form.Text className="text-muted">Description *</Form.Text>
          <Form.Group>
            <Form.Control
              required
              type="text"
              name="description"
              value={state.education && state.education.description}
              as="textarea"
              rows={3}
              onChange={e => {
                handleChange(e);
              }}
            />
            </Form.Group>
          </Row>
          <Row>
          <Form.Text className="text-muted">Activties & Societies</Form.Text>
          <Form.Group>
            <Form.Control
              required
              type="text"
              name="activtiesSocieties"
              value={state.education && state.education.activtiesSocieties}
              as="textarea"
              rows={3}
              onChange={e => {
                handleChange(e);
              }}
            />
          </Form.Group>
          </Row>
          <Row>
            <AddIcon className="ml-3" style={{ color: "blue" }} />{" "}
            <label for="image-post">
              <PhotoSizeSelectActualOutlinedIcon style={{ color: "grey" }} />{" "}
            </label>
            <input
              id="image-post"
              type="file"
              className="d-none"
              onChange={e => handleChangeImage(e)}
            />
          </Row>
          {/* <Form.File id="uploadFile">
              <Form.File.Label>Upload</Form.File.Label>
              <Form.File.Input />
            </Form.File> */}
        </Container>
        <Modal.Header>
          <div className="w-100 d-flex justify-content-end">
            {selectedEducation !== "" && (
              <Button
                className="mr-3"
                variant="danger"
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
            )}
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Modal.Header>
      </Form>
    </Modal>
  );
};

export default EducationModal;
