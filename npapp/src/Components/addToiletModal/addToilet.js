import classes from './addToilet.module.css';
import { useEffect, useRef, useState } from 'react';
import BasicSnackbar from '../../Components/BasicSnackbar/snackbar';
import Switch from '@mui/material/Switch';
import styled from 'styled-components';
import { addToilet } from '../../Services/toiletService';

export default function AddToiletForm({ closer }){

    const inputFileRef = useRef(null);
    const [value, setValue] = useState("");
    const [preview, setPreview] = useState();
    const [val, setVal]=useState([]);
    const [addClicked, setAddClicked] = useState(false);

    const [snackbarOpen, setsnackbarOpen] = useState(false);
	  const [snackbarContent, setsnackbarContent] = useState("");
	  const [snackbarType, setsnackbarType] = useState(0);

    const initialFieldValues = {
      name: '',
      location: '',
      city: '',
      imageSrc: '',
      imageFile: null,
    };
    const [formValues, setFormValues] = useState(initialFieldValues);
    const [formErrors, setFormErrors] = useState({});
	  const [isSubmit, setIsSubmit] = useState(false);

    const handleSnackbarClose = () => {

      setsnackbarOpen(false);
    };

    const onBtnClick = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
    }

    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormValues({...formValues, [name]: value});
    };
    
    const validate = (e) => {

      const errors = {}
      
      if(!formValues.name){
        errors.name = "Name is required.";
      }
      if(!formValues.city){
        errors.name = "City name is required";
      }
      if(!formValues.location){
        errors.location = "Location is a required field.";
      }
  
      return errors;
    };

    const handleSubmit = (e) => {

      e.preventDefault();
		  setFormErrors(validate(formValues));
		  setIsSubmit(true);
    };

    useEffect(() => {

      if(Object.keys(formErrors).length === 0 && isSubmit){
        const data = {
          name: formValues.name,
          location: formValues.location,
          city: formValues.city
        }
        addToilet(data).then(function (response){
        setsnackbarType(0);
        setsnackbarContent("Toilet added successfully.");
        setsnackbarOpen(true);
        closer();
      }).catch(function (error){
        setsnackbarType(1);
        setsnackbarContent(error.response.data.error);
        setsnackbarOpen(true);
      });
        setIsSubmit(false);
      }

    }, [isSubmit]);

    const changeHandler = (event) => {

        if(event.target.files && event.target.files[0]){
          let imageFile = event.target.files[0]
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onloadend = () => {
            setPreview(reader.result);
            setFormValues({...formValues, imageFile, imageSrc: reader.result });
        };
      }
      
    };

    return (<div className={classes.box}>
      
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <BasicSnackbar center={true} type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} />
		    <h1>Add a new toilet:</h1>
		    <input type="text" name="name" placeholder="Establishment name" value={formValues.name} onChange={handleChange} />
        <p className={classes.errors}>{formErrors.name}</p>
        <input type="text" name="city" placeholder="City" value={formValues.city} onChange={handleChange} />
        <p className={classes.errors}>{formErrors.city}</p>
		    <input type="text" name="location" placeholder="Location" value={formValues.location} onChange={handleChange} />
        <p className={classes.errors}>{formErrors.location}</p>
        
        <button type="submit">Add Toilet</button>
	  </form>
    </div>);
}