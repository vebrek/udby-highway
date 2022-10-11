import React from "react";
import { Fab, Tooltip } from "@mui/material";
import RoomIcon from '@mui/icons-material/Room';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';


const ToggleMapLayer = (props) => {
    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };
      
    return (
        <>  
        {props.showHeatmap ?
            <Tooltip title={"Show map with points from dataset"} arrow>
              <Fab color="secondary" aria-label="add" style={style} onClick={() => props.setShowHeatMap(false)}>
                <RoomIcon />
              </Fab>
            </Tooltip>
          :
            <Tooltip title={"Show heatmap with mean age as intensity"} arrow>
              <Fab color="secondary" aria-label="add" style={style} onClick={() => props.setShowHeatMap(true)}>
                <BubbleChartIcon />
              </Fab>
            </Tooltip>
          }
        </>
    )
}

export default ToggleMapLayer;