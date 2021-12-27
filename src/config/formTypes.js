// Copyright (C) 2018 Swift Navigation Inc.
//
// Contact: Swift Navigation <dev@swiftnav.com>
//
// This source is subject to the license found in the file 'LICENSE'
// which must be be distributed together with this source. All other
// rights reserved.

/*  TO DEFINE A NEW API TYPE, CALL THE FUNCTION makeType AS FOLLOWS:
      const someType = makeType('nameYourTypeNameHere');
    someType IS NOW PROXIED. YOU MAY DEFINE PROPERTIES, BUT YOU WILL
    SEE BUILD ERRORS IN DEVELOPMENT AND TEST MODES IF YOU DEFINE FIELDS INCORRECTLY.
    EXAMPLE DEFINITION:
      someType.someProperty = {
        default: false,
        label: 'active',
        type: allowedTypes.checkbox
      }
    NOTE: THE PROXY WRAPPING someType WILL SET THE name KEY AUTOMATICALLY:
      someType.someProperty.name = 'someProperty';
    NOTE: PROPERTY NAMES SHOULD MATCH CORRESPONDING PROPERTY NAMES IN THE api.
    PROPERTIES OF CONFIGURATION OBJECTS ********************************************
      default (REQUIRED): DEFAULT VALUE FOR FIELD
      label (REQUIRED): THE HUMAN-READABLE NAME OF THE FIELD (WHAT USERS WILL SEE)
      name (AUTO-GENERATED): NAME OF THE FIELD, WILL BE UNIQUE AND MATCH
        THE OBJECT KEY IN config
      placeholder (OPTIONAL): IF FORM INPUT BOXES FOR THIS FIELD NEED TO HAVE A
      PLACEHOLDER THAT DIFFERS FROM label, PROVIDE THAT HERE. THIS FIELD SHOULD
      BE A STRING.
      type (REQUIRED): CURRENTLY, CAN BE ONE OF THE FOLLOWING:
        text      FOR STRINGS AND NUMBERS
        textarea  FOR LARGE BLOCKS OF INPUT TEXT
        checkbox  FOR BOOLEANS
        select    FOR ENUMERABLE STRING FIELDS
      validate: IF THIS FIELD REQUIRES FORM VALIDATION, PROVIDE AN ARRAY OF VALIDATION
      FUNCTIONS HERE. THE FUNCTION MUST BE DEFINED IN src/helpers/validation.js. SEE
      src/helpers/validation.js FOR MORE DETAILS.
      options (REQUIRED FOR SELECT FIELDS): ARRAY OF ALLOWED VALUES FOR FIELD.
*/

// THESE IMPORTS ARE REQUIRED FOR MOST TYPES *******************************************************
import { allowedTypes, makeType } from '../helpers/types';
import MenuItem from '@mui/material/MenuItem';

const formType = makeType('station');

// DEFINE STATION FIELDS BELOW *********************************************************************

formType.name = {
  default: null,
  label: 'Name',
  type: allowedTypes.text,
  onChange: (input, id) => null,
  id: "name",
  required: true,
};

formType.description = {
  default: null,
  label: 'Description',
  type: allowedTypes.text,
  onChange: (input, id) => null,
  id: "description",
  required: true,
};

formType.cryptoCurrency = {
  default: 'UNKNOWN',
  label: 'Coin or token *',
  labelId: "demo-simple-select-label",
  id: "cryptoCurrency",
  menuItems: [<MenuItem value={'BTC'}>BTC</MenuItem>, <MenuItem value={'SOL'}>SOL</MenuItem>],
  type: allowedTypes.select,
  onChange: (input, id) => null,
  required: true,
};

formType.addDropdownList = {
  type: allowedTypes.addDropdownList,
  id: 'assets',
  dropdown: {
    default: 'UNKNOWN',
    label: 'Coin or token *',
    labelId: "demo-simple-select-label",
    id: "currency",
    menuItems: [<MenuItem value={'BTC'}>BTC</MenuItem>, <MenuItem value={'SOL'}>SOL</MenuItem>],
    required: true,

  },
  onChange: (input, id) => null,
};

formType.amount = {
  default: null,
  label: 'Amount (units)',
  type: allowedTypes.text,
  error: false,
  helperText: "Incorrect entry.",
  onChange: (input, id) => null,
  id: "amount",
  required: true,
};

export default formType;