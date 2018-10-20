import React from 'react';
import './componant.css';

export default function DisplayMsg(props) {
  let topStyle={top:props.top?props.top:'200px'};
  if (!props.hasOwnProperty('message')) {
    return (<div className="lds-css ng-scope">
      <div className="lds-dual-ring">
        <div style={topStyle}></div>
      </div>
    </div>);
  } else {
    return (<div>{props.message}</div>);
  }
}
