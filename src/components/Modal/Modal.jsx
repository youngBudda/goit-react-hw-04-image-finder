import { StyledModal, StyledOverlay } from './Modal.styled';
import { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  handleKeyDown = event => {
    if (event.code === `Escape`) {
      this.props.onClose();
    }
  };

  handlerOnClick = event => {
    if (event.targe === event.currentTarget) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <StyledOverlay onClick={this.onClick}>
        <StyledModal>
          <img
            src={this.props.modalData.modalURL}
            alt={this.props.modalData.alt}
          />
        </StyledModal>
      </StyledOverlay>
    );
  }
}
Modal.propTypes = {
  modalData: PropTypes.shape({
    modalUrl: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
