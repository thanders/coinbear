import formType from '../../config/formTypes';

const section = (name, fields) => ({ name, fields, });

const assetForm =  [
    
    section('Portfolio Information', [
        formType.name,
        formType.description,
        formType.addDropdownList
    ]),
]
export default assetForm;