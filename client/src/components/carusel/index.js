import React from 'react';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import RBCarousel from 'react-bootstrap-carousel';

class Carusel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: false,
    };
    this.imgArray = this.props.imgArray;
  }

  onSelect = (active, direction) => {
    console.log(`active=${active} && direction=${direction}`);
  };
  visiableOnSelect = active => {
    console.log(`visiable onSelect active=${active}`);
  };
  slideNext = () => {
    this.slider.slideNext();
  };
  slidePrev = () => {
    this.slider.slidePrev();
  };
  goToSlide = () => {
    this.slider.goToSlide(4);
  };
  autoplay = () => {
    this.setState({ autoplay: !this.state.autoplay });
  };
  _changeIcon = () => {
    let { leftIcon, rightIcon } = this.state;
    leftIcon = leftIcon ? (
      undefined
    ) : (
      <span className="glyphicon glyphicon-glass" />
    );
    rightIcon = rightIcon ? (
      undefined
    ) : (
      <span className="glyphicon glyphicon-music" />
    );
    this.setState({ leftIcon, rightIcon });
  };

  render() {
    const slide = src_ => {
      return (
        <div>
          <img style={{ width: '100%', height: '100%' }} src={src_} />
          <div className="carousel-caption">Image</div>
        </div>
      );
    };
    let { leftIcon, rightIcon } = this.state;
    return (
      <div>
        <RBCarousel
          animation={true}
          autoplay={this.state.autoplay}
          slideshowSpeed={2000}
          defaultActiveIndex={0}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onSelect={this.onSelect}
          ref={r => (this.slider = r)}
        >
          {`${this.imgArray.map(src_ => {
            return (
              <div key={src_}>
                <img src={src_} style={'width: "100%", height: "100%"'} />
                <div className="carousel-caption">Image</div>
              </div>
            );
          })}`}
        </RBCarousel>
      </div>
    );
  }
}

const Row = props => <div className="row">{props.children}</div>;
const Col = props => (
  <div className={`col-xs-${props.span}`} style={props.style}>
    {props.children}
  </div>
);
const Button = props => {
  const { style, bsStyle, onClick } = props;
  const className = bsStyle ? `btn btn-${bsStyle}` : 'btn';
  return (
    <button style={style} className={className} onClick={onClick}>
      {props.children}
    </button>
  );
};

export default Carusel;
