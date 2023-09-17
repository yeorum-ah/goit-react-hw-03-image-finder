import { Component } from "react";
import { Loader } from "./Loader/Loader";
import { LoadMoreBtn } from "./Button/Button";
import { Searchbar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { FetchImg } from "./Api/Api";
import { GlobalStyle } from "./GlobalStyle.styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component{
  state = {
    hits :[],
    total: 0,
    totalHits: 0,
    searchValue: "",
    loading: false,
    isModalOpen: false, 
    selectedImage: null,
    page: 1,
    isToastShown: false,
  }

  async componentDidMount(){
      window.addEventListener('keydown', this.handleKeyPress);

  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }
  
  async componentDidUpdate(prevProps, prevState){
    const isValidInput = /^[a-zA-Z0-9\s]+$/.test(this.state.searchValue);
    if (!isValidInput || this.state.searchValue === ""){
      toast.error("Please enter a valid search query", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    } else {
      if(prevState.searchValue !== this.state.searchValue || prevState.page !== this.state.page ){
        this.setState({loading: true});

        try {
         
          const {hits, totalHits, total} = await FetchImg(this.state.searchValue.split('/').pop(), this.state.page)
          this.setState(previousState => ({
            hits: [...previousState.hits, ...hits],
            totalHits: totalHits,
            total: total
          }));
          if(totalHits === 0){
             toast.error("Nothing has defined, Sorry, there are no images matching your search query. Please try again.", {
             position: toast.POSITION.TOP_CENTER
            });
          return }
          if (!this.state.isToastShown ) {
            toast.success(`Hooray! We found ${totalHits} images`, {
              position: toast.POSITION.TOP_CENTER
            });
            this.setState({ isToastShown: true });
          }
              if(this.state.page > Math.round((totalHits / 12))){
          toast.error(" Ups, We're sorry, but you've reached the end of search results.", {
            position: toast.POSITION.TOP_CENTER
          });
        }
         
        } catch (error) {
          console.error("Error fetching data from API:", error);
          return null;
        }
        finally{ 
          this.setState({loading: false});
        }
    }
    }
  }

  onLoadMore = () => {
    this.setState(previousState => ({
      page: previousState.page + 1,
    }));

    
  };
  
 
  onSearch = search => {
    this.setState({
      hits: [], 
      totalHits: 0,
      page: 1,
      searchValue: search,
      isToastShown: false 
    });
   
  }
  

   handleImageClick = (imageUrl) => {
    console.log(imageUrl);
    this.setState({ selectedImage: imageUrl , isModalOpen: true});
};
   handleKeyPress = (e) => {
    if ( e.code === "Escape") {
      this.setState({isModalOpen: false});
    }
};

handleCloseModal = (e) => {
  if (e.target.tagName.toLowerCase() === 'img') {
    return;
  }
  this.setState({isModalOpen: false});
}

  render() {
    const { loading, isModalOpen, selectedImage, searchValue, totalHits, page} = this.state;  
    const appStyles = {
      display: "grid",
      gridTemplateColumns: "1fr", 
      gridGap: "16px", 
      paddingBottom: "24px", 
    };

    return (
      <div style={appStyles}>
        <Searchbar onSearch={this.onSearch}/>

        {searchValue !== '' && searchValue.trim() !== '' && (  <ImageGallery images={this.state.hits} 
                      onImageClick={this.handleImageClick}  
                      isModalOpen={isModalOpen}
        />)}
        {totalHits !== 0 &&  page < Math.ceil((this.state.totalHits / 12)) &&  (<LoadMoreBtn onLoadMore={this.onLoadMore}/>)}
        <GlobalStyle />
        {isModalOpen && selectedImage && (
          <Modal selectedImage={selectedImage} onClose={this.handleCloseModal} />
        )}
        {loading && <Loader></Loader>}
        <ToastContainer
            autoClose={4000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
    </div>
  );}
}