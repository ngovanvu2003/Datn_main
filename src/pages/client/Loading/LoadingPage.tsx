import styled, { css } from "styled-components";
import loading from "./loading.css?inline";

const LoadingCOmponent = styled.div`
  ${css`
    ${loading}
  `}
`;

const LoadingPage = () => {
  return (
    <LoadingCOmponent>
      <div className="body-loading">
        <div className="main-loading">
          <div className="shadow-wrapper">
            <div className="shadow"></div>
          </div>
          <div className="dragon">
            <div className="body"></div>
            <div className="horn-left"></div>
            <div className="horn-right"></div>
            <div className="eye left"></div>
            <div className="eye right"></div>
            <div className="blush left"></div>
            <div className="blush right"></div>
            <div className="mouth"></div>
            <div className="tail-sting"></div>
          </div>
          <div className="fire-wrapper">
            <div className="fire"></div>
          </div>
          <div className="progress-loading">
            <span className="">Loading...</span>
            <div className="outer">
              <div className="inner"></div>
            </div>
          </div>
        </div>
      </div>
    </LoadingCOmponent>
  );
};

export default LoadingPage;
