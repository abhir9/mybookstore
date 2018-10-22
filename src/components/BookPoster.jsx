import React from 'react';
import {Image} from 'react-bootstrap'
import styled from 'styled-components'

export default function Poster(props) {

  const StyledImg = styled.div`
    padding: 15px 10px 15px 10px;
    &:hover .image{
       opacity:1;
    }
    &:hover .title{
       opacity: ${props.info ? 1 : 0};
    }
  `;
  const Info = styled.div`
      position: absolute;
      top: 75%;
      margin:10px;
      color:#3be8b0;
      font-weight:bold;
      opacity:0;
  `;
  return (
      <StyledImg>
        <Image className="image" style={{width: '233px', height: '300px'}} key={props.id} src={props.path} responsive/>
        {props.info &&
        <Info className="title">
          <h4>{props.title}</h4>
        </Info>
        }
      </StyledImg>
  );
}
