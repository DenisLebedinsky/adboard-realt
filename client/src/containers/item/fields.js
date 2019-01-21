import React, { Component } from 'react';
import './style.css';

class Field extends Component {
  constructor(props) {
    super(props);
    Field.slide = Field.slide.bind(this);
  }

  static slide(imgsrc) {
    return (
      <div className="carousel-item active">
        <img className="d-block w-100" src={imgsrc} alt={imgsrc} />
      </div>
    );
  }

  render() {
    return (
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          {this.props.item &&
            this.props.item.imgArr.map((data, index) => (
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to={index}
                className={index === 0 ? 'active' : ''}
              />
            ))}
        </ol>
        <div className="carousel-inner">
          {this.props.item &&
            this.props.item.imgArr.map(imgsrc => Field.slide(imgsrc))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

export default Field;
