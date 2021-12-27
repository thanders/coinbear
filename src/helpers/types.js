// Copyright (C) 2018 Swift Navigation Inc.
//
// Contact: Swift Navigation <dev@swiftnav.com>
//
// This source is subject to the license found in the file 'LICENSE'
// which must be be distributed together with this source. All other
// rights reserved.

import _ from 'lodash';

export const allowedTypes = {
  checkbox: 'checkbox',
  select: 'select',
  text: 'text',
  textarea: 'textarea',
  addDropdownList: 'addDropdownList'
};

export const requiredFields = ['default', 'label', 'type'];

export const checkConfigObj = (obj, property, value, name) => {
  // MAKE SURE WE ARE NOT ATTEMPTING TO SET A RESERVED KEY
  if (property === 'Empty' || property === 'Default') {
    throw new Error(`'${property}' is a reserved keyword.`);
  }

  // THROW ERROR IF WE ARE ATTEMPTING TO SET THE SAME FIELD MULTIPLE TIMES
  if (obj[property] !== undefined) {
    throw new Error(`Found redundant definition for ${property} in ${name} config`);
  }
  // ERROR IF CONFIG OBJECT IS MISSING A REQUIRED FIELD
  requiredFields.forEach((field) => {
    if (value[field] === undefined) {
      throw new Error(`Attempting to define field ${property} without value for ${field}`);
    }
  });

  if (value.validate !== undefined) {
    // CHECK THAT validate, IF IT EXISTS, IS AN ARRAY
    if (!Array.isArray(value.validate)) {
      throw new Error(`Definition for field ${property} has invalid property validate`);
    }

    // CHECK THAT THE DEFAULT VALUE PROVIDED PASSES VALIDATION
    value.validate.forEach((func) => {
      if (func(value.default) === 'error') {
        throw new Error(`Default value ${value.default} for ${property} does not pass validation`);
      }
    });
  }

  // CHECK THAT THE INPUT TYPE PROVIDED IS VALID
  if (!allowedTypes[value.type]) {
    throw new Error(`Invalid input type ${value.type} for property ${property}`);
  }


  // CHECK THAT SELECT FIELDS HAVE options ARRAY
  if (value.type === allowedTypes.select && (!value.options || !Array.isArray(value.options))) {
    throw new Error(`No select options defined for field ${property} of type select`);
  }

  // CHECK THAT NON-SELECT FIELDS DO NOT HAVE options SET
  if (value.type !== allowedTypes.select && value.options !== undefined) {
    throw new Error(`Field '${property}' of type '${value.type}' should not have options configured.`);
  }

  return true;
};

export const makeType = name => new Proxy({}, {
  get: (obj, property) => {
    if (property === 'Empty') {
      return _.mapValues(obj, () => null);
    }
    if (property === 'Default') {
      return _.mapValues(obj, field => field.default);
    }
    if ((process.mode === 'development' || process.mode === 'test') && obj[property] === undefined) {
      throw new Error(`Attempting to access undefined field '${property}' in config ${name}`);
    }
    return obj[property];
  },
  set: (obj, property, value) => {
    if (process.mode === 'development' || process.mode === 'test') {
      checkConfigObj(obj, property, value, name);
    }
    Reflect.set(obj, property, {
      ...value,
      name: property
    });
    return true;
  }
});