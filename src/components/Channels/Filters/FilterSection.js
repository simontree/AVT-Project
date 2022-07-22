import Divider from '@mui/material/Divider';
import {Grid, Container, Typography} from '@mui/material'
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { AntSwitch } from "./AntSwitch";

export const FilterSection = (props) => {

    return(
    <Container>
        <Divider sx={{ "&::before, &::after": {borderColor: "#bbdefb",}, marginTop: '5px' }}> 
        <Typography variant="h6">Filter</Typography> 
        </Divider>
        <Grid container
        alignItems="center"
        justifyContent="space-evenly"
        direction='row'
        sx={{marginTop: '5px'}}>
            <Grid item sx={{marginRight: '15px'}}>
              <Typography variant='body1'>
                  Highpass
              </Typography>
            </Grid>
            <Grid item width={60} sx={{marginRight: '5px'}}>
              <Slider
                size="small"
                min={0}
                max={2}
                step={0.01}
                value={props.filterHighGain}
                id={"highpass" + props.channelID}
                onChange={props.highpassFilterInput}
                valueLabelDisplay="auto"
                sx={{color: '#bbdefb', height: 4}}
                />
            </Grid>
            <Grid item >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Off</Typography>
                  <AntSwitch 
                  checked={props.highpassSet}
                  id={"highpass checkbox" + props.channelID}
                  onChange={props.filterClick} />
                <Typography>On</Typography>
              </Stack>
            </Grid>
        </Grid>
        <Grid container
        alignItems="center"
        justifyContent="space-evenly"
        direction='row'>
            <Grid item sx={{marginRight: '15px'}}>
              <Typography variant='body1'>
                  Bandpass
              </Typography>
            </Grid>
            <Grid item width={60} sx={{marginRight: '5px'}}>
              <Slider
                size="small"
                min={0}
                max={2}
                step={0.01}
                value={props.filterBandGain}
                id={"bandpass" + props.channelID}
                onChange={props.bandpassFilterInput}
                valueLabelDisplay="auto"
                sx={{color: '#bbdefb', height: 4}}
                />
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Off</Typography>
                  <AntSwitch 
                  checked={props.bandpassSet}
                  id={"bandpass checkbox" + props.channelID}
                  onChange={props.filterClick} />
                <Typography>On</Typography>
              </Stack>
            </Grid>
        </Grid>
        <Grid container
        alignItems="center"
        justifyContent="space-evenly"
        direction='row'>
            <Grid item sx={{marginRight: '15px'}}>
              <Typography variant='body1'>
                  Lowpass
              </Typography>
            </Grid>
            <Grid item width={60} sx={{marginRight: '5px'}}>
              <Slider
                size="small"
                min={0}
                max={2}
                step={0.01}
                value={props.filterLowGain}
                id={"lowpass" + props.channelID}
                onChange={props.lowpassFilterInput}
                valueLabelDisplay="auto"
                sx={{color: '#bbdefb', height: 4}}
                />
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Off</Typography>
                  <AntSwitch 
                  checked={props.lowpassSet}
                  id={"lowpass checkbox" + props.channelID}
                  onChange={props.filterClick} />
                <Typography>On</Typography>
              </Stack>
            </Grid>
        </Grid>
    </Container>
    )
}
    
    