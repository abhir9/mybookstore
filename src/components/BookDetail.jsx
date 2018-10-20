import React from 'react'
import {Image} from 'react-bootstrap'
import {Col, Grid, Row} from 'react-bootstrap/lib';
import './componant.css'
import {DisplayMsg} from '../components';

export default function Modal({id, handleClose, fetching, show, data, children}) {
  return (
      <div className="modaldiv">
        {children}
        <div className="modalclose" onClick={handleClose}>
          X
        </div>
          {!fetching && id && <Grid>
          <Row style={{width: '120%'}}>
            <Col xs={6} sm={3} md={4}>
              <Image className="image" style={{width: '233px', height: '300px'}} src={data.image_url} responsive/>
              <Row style={{fontSize: '2.3em'}}>
                <div className="stardiv"><i className="star"></i>
                  <span className="rating">{data.average_rating}</span>
                </div>
                <div >{data.authors ? data.authors.author.name : ''}
                </div>
              </Row>
            </Col>
            <Col xs={6} sm={6} md={6} className="details">
              <h1>{data.title}</h1>
              <h3>{}</h3>
              <div dangerouslySetInnerHTML={{__html: data.description}}/>
            </Col>
          </Row>
        </Grid>}
          {fetching &&  <div>
          <DisplayMsg/>
        </div>}
      </div>
  );
};