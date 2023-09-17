import { Header,  Button, StyledForm, StyledField } from "./SearchBar.styled";
import { Formik} from 'formik';
import { ReactComponent as Icon } from "./search-icon.svg";


export const Searchbar = ( {onSearch}) => {
  
    return <>
        <Header className="searchbar">
  <Formik 
  initialValues={{ searchQuery: "" }} 
  onSubmit={value => 
    {
      onSearch(value.searchQuery)}
    }>
    <StyledForm >
    <Button type="submit" className="button" >
        <svg href="./search-icon.svg"></svg>
    </Button>

    <StyledField
      className="input"
      type="text"
      name="searchQuery"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
    </StyledForm>
  </Formik>
</Header>
    </>
}