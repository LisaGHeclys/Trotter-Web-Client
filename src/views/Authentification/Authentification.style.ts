import styled from "styled-components";
import { COLORS } from "../../UI/Colors";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DividerText = styled.hr`
  line-height: 1em;
  width: 50%;
  outline: 0;
  border: 0;
  position: relative;
  text-align: center;
  color: ${COLORS.grey};
  opacity: 0.5;
  padding: 30px 0;

  @media screen and (max-width: 767px) {
    width: 80%;
  }

  &:before {
    content: "";
    background: linear-gradient(
      to right,
      transparent,
      ${COLORS.text},
      transparent
    );
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: ${COLORS.text};
    padding: 0 0.5em;
    line-height: 1.5em;
    background-color: ${COLORS.bg};
  }
`;

export const OAuthButtonRow = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 1;
  gap: 42px;

  @media screen and (max-width: 768px) {
    gap: 28px;
  }
`;

export const WrapperInput = styled.div`
  position: relative;
`;

export const IconInput = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 87%;
  transform: translateY(-50%);
`;

export const AuthentificationInput = styled.input`
  background-color: ${COLORS.bg};
  box-sizing: border-box;
  width: 400px;
  height: 60px;
  padding: 0 10px;

  border: 1px solid lightgray;
  border-radius: 10px;
  font-size: 16px;
  outline: none;

  @media screen and (max-width: 540px) {
    width: 320px;
    height: 50px;
  }
`;

export const AuthentificationButton = styled.button`
  margin-top: 34px;
  width: 180px;
  height: 48px;
  border: none;
  border-radius: 10px;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: ${COLORS.blue};
    scale: 1.06;
  }
  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

export const LinkToOtherAuthButton = styled.button`
  margin-top: 34px;
  width: 180px;
  height: 48px;
  z-index: 1;
  background-color: ${COLORS.blue};
  border: none;
  border-radius: 10px;
  color: ${COLORS.bg};
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;

  &:hover {
    transition-duration: 0.4s;
    scale: 1.06;
  }
`;
