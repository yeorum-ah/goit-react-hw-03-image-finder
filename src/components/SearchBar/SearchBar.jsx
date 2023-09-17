import { Header,  Button, StyledForm, StyledField } from "./SearchBar.styled";
import { Formik} from 'formik';



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