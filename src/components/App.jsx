import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import { requestImages } from 'services/api';
import Section from './Section/Section';
import { Component } from 'react';

export class App extends Component {
  state = {
    modal: { open: false, modalData: null },
    loading: false,
    error: null,
    page: 1,
    images: [],
    value: '',
    totalImages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.value !== this.state.value
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    try {
      this.setState({ loading: true });
      const data = await requestImages(this.state.value, this.state.page);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...data.hits],
          totalImages: data.totalHits,
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  onSearchPictures = value => {
    this.setState({ page: 1, images: [] });
    const normalizedValue = value.toLowerCase().trim();
    this.setState({ value: normalizedValue });
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  openModal = data => {
    this.setState({
      modal: { open: true, modalData: data },
    });
  };

  closeModal = () => {
    this.setState({ modal: { open: false, modalData: null } });
  };

  render() {
    const buttonOption = this.state.page * 12 >= this.state.totalImages;
    return (
      <Section>
        <Searchbar onSearchPictures={this.onSearchPictures} />
        {this.state.loading && <Loader />}
        <ImageGallery
          images={this.state.images}
          handlerClick={this.openModal}
        />
        {this.state.modal.open && (
          <Modal
            onClose={this.closeModal}
            modalData={this.state.modal.modalData}
          />
        )}
        {this.state.images.length > 0 && (
          <Button handlerClick={this.loadMore} disabled={buttonOption} />
        )}
      </Section>
    );
  }
}
