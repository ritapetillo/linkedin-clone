import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import styled, { css } from "styled-components";
import "../Styles/NewPostButton.css";
import { Link } from "react-router-dom";

function NewPostButton({ scrollUp, fetchAllPosts }) {
  const controls = useRef();
  const [fixedPosition, setFixedPosition] = useState(false);
  useEffect(() => {
    const initialTop = controls.current.getBoundingClientRect().top;
    const handleScroll = () => {
      setFixedPosition(window.scrollY > initialTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Contain
      fixed={fixedPosition}
      ref={controls}
      onClick={() => {
        scrollUp();
        fetchAllPosts();
      }}
    >
      <Link to="/feeds">
        <Button variant="primary" className="rounded-pill NewPostButton">
          New Posts ↑
        </Button>
      </Link>
    </Contain>
  );
}

const Contain = styled.div`
  display: flex;
  flex-direction: row;
  ${(props) =>
    props.fixed &&
    css`
      position: fixed;
      width: 175px;
      top: 100px;
      z-index: 99;
      right: 51.75%;
    `}
`;
export default NewPostButton;
