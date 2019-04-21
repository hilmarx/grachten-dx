import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgb(111,91,173)',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 18,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '75%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(tp, price, priceIncrement, price2, spread) {
  id += 1;
  return { tp, price, priceIncrement, price2, spread };
}

// const rows = [
  
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

function CustomizedTable(props) {
  console.log("here")
  const { classes, tp } = props;
  console.log(tp)
  const rows = []
  try {
    const tp1 = tp[0]
    const tp2 = tp[1]
    Object.keys(tp1).forEach(symbol => {
      if (symbol === 'key') return 0;
      rows.push(createData(`${symbol}-WETH`, `${parseFloat(tp1[symbol][0].price).toFixed(4)} ${symbol}`,`${tp1[symbol][0].priceIncrement}%`, `${ parseFloat( 1 / tp2[symbol][0].price).toFixed(4)} ${symbol}`, `${(( parseFloat(tp1[symbol][0].price)) -  ( parseFloat( 1 / tp2[symbol][0].price))).toFixed(4)} ${symbol}`))
    })

  }
  catch(e) {
    console.log(e)
  }
  

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Trading Pair</CustomTableCell>
            <CustomTableCell align="right">Last Bid Price</CustomTableCell>
            <CustomTableCell align="right">% Change (since last auction)</CustomTableCell>
            <CustomTableCell align="right">Last Ask Price (converted)</CustomTableCell>
            <CustomTableCell align="right">Bid/Ask Spread</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.tp}
              </CustomTableCell>
              <CustomTableCell align="right">{row.price}</CustomTableCell>
              <CustomTableCell align="right">{row.priceIncrement}</CustomTableCell>
              <CustomTableCell align="right">{row.price2}</CustomTableCell>
              <CustomTableCell align="right">{row.spread}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);