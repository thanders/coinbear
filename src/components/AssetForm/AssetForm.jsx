import assetFormConfig from './formConfig'
import FieldMapper from '../../containers/FormFields/FieldMapper';
import css from './assetForm.module.css';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch } from "../../hooks";
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { useAppSelector } from "../../hooks";
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import {
    useNavigate,
  } from "react-router-dom";

export default function AssetForm() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formState = useAppSelector(state => state).createPortfolio.formData;
    const isSubmitDisabled = useAppSelector(state => state).createPortfolio.isSubmitDisabled;
    const formStateMutable = JSON.parse( JSON.stringify( formState ) );

    const changeHandler = (input, id) => {

        if (id === 'assets' && input) {
            formStateMutable.assets[input.currency] = input;
            dispatch({ type: "updateFormDataAssets", payload: formStateMutable.assets });
            dispatch({ type: "isSubmitDisabled", payload: null });
        }
        else {
            formStateMutable[id] = input;
            console.log(formStateMutable);
            dispatch({ type: "updateFormData", payload: formStateMutable});
            dispatch({ type: "isSubmitDisabled", payload: null });
        }
    };

    const submitForm = () => {
        // Already knows that `dispatch` can accept a thunk
        dispatch({ type: "portfolios/add", payload: formStateMutable});
        dispatch({ type: "resetToDefault", payload: null});
        dispatch({ type: "isSubmitDisabled", payload: null });
        navigate('/coinbear', {
            state:{ name:'Portfolio created'}
        });

    }

    const cancelButtonHandler = () => {
        dispatch({ type: "resetToDefault", payload: null});
        navigate('/coinbear');
    }

    const primaryButton= <Button variant="outlined" onClick={()=> submitForm()} disabled={isSubmitDisabled}>Submit</Button>;
    const secondaryButton= <Button variant="outlined" onClick={() => cancelButtonHandler()} >Cancel</Button>;

    return(
        
        <div>
            <head>
                <link rel="stylesheet" href="/style.css" ></link>
            </head>
            {
            assetFormConfig.map((section, i) => {
                return(
                    <div className={css.formBodyContainer}>
                        <div className={css.sectionTitle}>
                            <h2>{section.name}</h2>
                        </div>
                        <div className={css.formContainer}>
                            <FormControl sx={{ width: '28ch' }}>
                                {section.fields.map((field) => {
                                    field.value = formState[field.id];
                                    field.onChange = (input, id) => {changeHandler(input, id)}
                                        return(
                                            <div className={css.fieldContainer}>
                                                {FieldMapper(field)}
                                            </div>
                                        );
                                    })
                                }
                            </FormControl>
                            <ButtonContainer primaryButton={primaryButton} secondaryButton={secondaryButton}/>
                        </div>
                    </div>
                );
            })
            }
        </div>
    )
}