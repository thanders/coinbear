import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function AssetsGrid({portfolios, isEditable, cellChangeCallback, onRowSelect }) {

  const changeHandler = (e) => {
    if(e.field && e.row && e.value && e.row[e.field] !== e.value) {
      const data = {
        field: e.field,
        asset: e.row.currency,
        value: e.value
      };
      cellChangeCallback(data);
    }
  }

  const columns = [
    { field: 'currency', headerName: 'Currency', width: 150, renderCell: (params) => params.value, editable: isEditable},
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      editable: isEditable,
      onChange: (e) => changeHandler(e),
      preProcessEditCellProps: (params) => {
        const invalid = isNaN(params.props.value) || params.props.value.length === 0;
        return { ...params.props, error: invalid };
      }
    }
  ];

  const borderColor = isEditable ? 'success.main' : 'primary.dark';

  return (
    <Box
      sx={{
        height: 400,
        width: 1,
        '& .MuiDataGrid-cell--editing': {
          bgcolor: 'rgb(255,215,115, 0.19)',
          color: '#1a3e72',
          '& .MuiInputBase-root': {
            height: '100%',
          },
        },
        '& .Mui-error': {
          bgcolor: (theme) =>
            `#ef5350`,
          color: (theme) => (theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f'),
        },
      }}
    >
      <DataGrid
        rows={portfolios}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection={true}
        disableSelectionOnClick={true}
        onCellEditCommit={changeHandler}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = portfolios.filter((row) =>
          selectedIDs.has(row.id)
          );
          onRowSelect(selectedRowData);
        }}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: borderColor,
        }}
        
      />
    </Box>
  );
}

AssetsGrid.propTypes = {
  portfolios: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool.isRequired,
  cellChangeCallback: PropTypes.func.isRequired,
  onRowSelect: PropTypes.func.isRequired,
}

AssetsGrid.defaultProps = {}

export default AssetsGrid;
