// Copyright (C) 2018 Swift Navigation Inc.
//
// Contact: Swift Navigation <dev@swiftnav.com>
//
// This source is subject to the license found in the file 'LICENSE'
// which must be be distributed together with this source. All other
// rights reserved.

import React from 'react';
import { allowedTypes } from '../../helpers/types';
import TextFieldContainer from './TextFieldContainer';
import SelectForm from '../../components/SelectForm/SelectForm';
import AddDropdownList from '../../components/AddDropdownList/AddDropdownList';

const FieldMapper = (props) => {
  switch (props.type) {
    case allowedTypes.text:
      return <TextFieldContainer {...props} />;
    case allowedTypes.select:
      return <SelectForm {...props} children={props.menuItems} />;
    case allowedTypes.addDropdownList:
        return <AddDropdownList {...props} children={props.menuItems} />;
    default:
      return null;
  }
};

export default FieldMapper;