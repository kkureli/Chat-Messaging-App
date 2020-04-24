import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalBody from "react-bootstrap/ModalBody";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { createChannel } from "../../../../store/actions/channelActions";
import { connect } from "react-redux";

function ChannelModal(props) {
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleClose = () => setShow(false);

  const handleAddChannel = () => {
    setShow(true);
  };

  const handleChannelTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChannelDesc = (e) => {
    setDesc(e.target.value);
  };

  const submitChannel = () => {
    setShow(false);
    props.createChannel(title, desc);
  };

  return (
    <>
      <img
        width="40px"
        onClick={() => handleAddChannel()}
        className="addChannel"
        src="https://image.flaticon.com/icons/svg/399/399271.svg"
      />

      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                Name of Channel
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={(e) => handleChannelTitle(e)}
              placeholder="React"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                About the Channel
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={(e) => handleChannelDesc(e)}
              placeholder="About the UI Library React"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button onClick={() => submitChannel()} variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createChannel: (title, desc) => dispatch(createChannel(title, desc)),
  };
};

export default connect(null, mapDispatchToProps)(ChannelModal);
