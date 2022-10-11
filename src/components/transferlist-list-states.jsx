import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { CircularProgress, Skeleton } from '@mui/material';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferListStates(props) {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(props.initStates);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, props.inactiveStates);
  const rightChecked = intersection(checked, props.activeStates);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    let newLeft = not(props.inactiveStates, leftChecked);
    let newRight = [...props.activeStates].concat(leftChecked);
    // setRight(newRight);
    // setLeft(newLeft);
    setChecked(not(checked, leftChecked));
    props.setInactiveStates(newLeft);
    props.setActiveStates(newRight)
  };

  const handleCheckedLeft = () => {
    let newLeft = [...props.inactiveStates].concat(rightChecked);
    let newRight = not([...props.activeStates], rightChecked);
    // setLeft(newLeft);
    // setRight(newRight);
    setChecked(not(checked, rightChecked));
    props.setInactiveStates(newLeft);
    props.setActiveStates(newRight)
    console.log(newRight)
  };

  const customList = (title, items, loading) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={``}
      />
      <Divider />
      <List
        sx={{
          width: 150,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        
        {!loading ?
          items.map((value) => {
            const labelId = `transfer-list-all-item-${value}-label`;

            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value}`} />
              </ListItem>
            );
          })
          :
          [0, 1, 2, 3].map((value) => {
            const labelId = `transfer-list-all-item-${value}-label`;

            return (
              <ListItem
                key={value}
                role="listitem"
                button
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disabled
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}

                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={<Skeleton animation="wave" />} />
              </ListItem>
            );
          }) 
          }
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('States', props.inactiveStates.sort(), props.loading)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Chosen', props.activeStates.sort(), props.loading)}</Grid>
    </Grid>
  );
}
