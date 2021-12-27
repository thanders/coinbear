import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import prepareGrid from './prepareGrid';
import { gridColumns } from './gridColumns';
import PropTypes from 'prop-types';

function ViewPortfoliosGrid(
  {
    portfolios,
    areActive,
    onRowSelect
  }) {

  const [modifiedPortfolio, setModifiedPortfolio] = useState([]);

  useEffect(() => {
    if(portfolios.length > 0) {
      const gridData = prepareGrid(portfolios);
      setModifiedPortfolio(gridData);
    }
    else {
      setModifiedPortfolio([]);
    }

}, [portfolios]);

  return (
    <div style={{ height: 400, width: '100%', color: 'black'}}>
      <DataGrid
        rows={modifiedPortfolio}
        columns={gridColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = portfolios.filter((row) =>
          selectedIDs.has(row.id)
          );
          onRowSelect(selectedRowData);
        }}
      />
    </div>
  );
}

ViewPortfoliosGrid.propTypes = {
  portfolios: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool.isRequired,
  cellChangeCallback: PropTypes.func.isRequired,
  onRowSelect: PropTypes.func.isRequired,
}

ViewPortfoliosGrid.defaultProps = {}

export default ViewPortfoliosGrid;
