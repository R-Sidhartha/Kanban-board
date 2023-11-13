import React from 'react'
import AssetContext from './AssetContext';

const AssetState = (props) => {
    const statusIcons = {
      'Todo': <i className="fa-solid fa-forward fa-sm" style={{ color: '#dd8827' }}></i>,
      'In progress': <i className="fa-solid fa-spinner fa-sm" style={{ color: '#ceb727' }}></i>,
      'Done': <i className="fa-regular fa-calendar-check fa-sm" style={{ color: '#52a60c' }}></i>,
      'Canceled': <i className="fa-solid fa-ban fa-sm" style={{ color: '#d42b2b' }}></i>,
      'Backlog': <i className="fa-solid fa-backward fa-sm" style={{ color: '#a8a8a8' }}></i>, 
    };
    const priorityicons={
      4: <i className="fa-solid fa-exclamation-triangle fa-sm" style={{ color: 'rgb(221, 39, 39)' }}></i>,
      3: <i className="fa-solid fa-exclamation-circle fa-sm" style={{ color: 'rgb(229, 105, 105)' }}></i>,
      2: <i className="fa-sharp fa-solid fa-star fa-sm" style={{ color: '#dd8827' }}></i>,
      1: <i className="fa-regular fa-circle-down fa-sm" style={{ color: 'rgb(159, 143, 59)' }}></i>,
      0: <i className="fa-regular fa-thumbs-down fa-sm" style={{ color: 'rgb(97, 140, 142)' }}></i>,
    }
    return (
      <AssetContext.Provider value={{statusIcons,priorityicons}}>
        {props.children}
      </AssetContext.Provider>
    )
  }

export default AssetState;
