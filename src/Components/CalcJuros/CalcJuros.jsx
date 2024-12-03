import * as React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  Switch,
  Input,
  InputAdornment,
  FormHelperText,
  styled,
  alpha,
} from '@mui/material';
import { LineChart } from '@mui/x-charts';
import Footer from './Extras/Footer';

const StyledButton = styled(Button)({
  color: 'white',
  backgroundImage: 'linear-gradient(#454545, transparent)',
  backgroundColor: 'black',
  borderRadius: 8,
  transition: 'cubic-bezier(0.4, 0, 0.25, 0.6) 200ms',
  '&:hover': {
    backgroundColor: '#454545',
  },
});

const BlackSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#000',
    '&:hover': {
      backgroundColor: alpha('#000', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#000',
  },
}));

export default function CalcJuros() {
  const [taxa, setTaxa] = React.useState('');
  const [capital, setCapital] = React.useState('');
  const [time, setTime] = React.useState('');
  const [timeXAxis, setTimeXAxis] = React.useState(1);
  const [series, setSeries] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [valorInicial, setValorInicial] = React.useState('');
  const [valorTotalEmJuros, setValorTotalEmJuros] = React.useState('');
  const [valorFinal, setValorFinal] = React.useState('');

  const CalcJurosSimples = (c, i, t) => {
    if (c === '' || i === '' || t === '') return setError(true);

    const updatedSeries = Array.from({ length: Number(t) }, (_, index) =>
      (Number(c) + Number(c) * (Number(i) / 100) * (index + 1)).toFixed(2),
    );

    setValorInicial(c);
    setValorTotalEmJuros(updatedSeries[updatedSeries.length - 1] - c);
    setValorFinal(updatedSeries[updatedSeries.length - 1]);

    setTimeXAxis(t === '' ? 1 : t);
    setSeries(updatedSeries);

    setError(false);
  };

  const CalcJurosCompostos = (c, i, t) => {
    if (c === '' || i === '' || t === '') return setError(true);

    const updatedSeries = Array.from({ length: Number(t) }, (_, index) =>
      (Number(c) * Math.pow(1 + Number(i) / 100, index + 1)).toFixed(2),
    );

    setValorInicial(c);
    setValorTotalEmJuros(updatedSeries[updatedSeries.length - 1] - c);
    setValorFinal(updatedSeries[updatedSeries.length - 1]);

    setTimeXAxis(t === '' ? 1 : t);
    setSeries(updatedSeries);

    setError(false);
  };

  return (
    <Box my={3} mx={{ xs: 2.5, md: 8 }}>
      <Box display={'flex'} flexDirection={'column'}>
        <Box>
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, // Fontes responsivas
            }}
          >
            Calculadora de Juros
          </Typography>
        </Box>
        <Box alignSelf={'end'} mt={1} display={'flex'} gap={1}>
          <FormControlLabel
            sx={{ display: { xs: 'none', sm: 'block' } }}
            control={
              <BlackSwitch
                onChange={() => setIsChecked(!isChecked)}
                checked={isChecked}
              />
            }
            label='Juros compostos'
          />
          <FormControlLabel
            sx={{ display: { xs: 'block', sm: 'none' } }}
            control={
              <BlackSwitch
                onChange={() => setIsChecked(!isChecked)}
                checked={isChecked}
              />
            }
            label='JC'
          />
          <StyledButton
            onClick={() => {
              if (!isChecked) return CalcJurosSimples(capital, taxa, time);
              CalcJurosCompostos(capital, taxa, time);
            }}
          >
            Calcular
          </StyledButton>
        </Box>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        my={2}
        component={Paper}
        elevation={24}
        py={4}
        px={1}
        borderRadius={4}
        height={'100%'}
      >
        <Box display={'flex'} gap={{ xs: 2, sm: 5, md: 10 }} px={3}>
          <FormControl fullWidth={true}>
            <Input
              type='number'
              value={capital}
              onChange={(e) =>
                e.target.value === ''
                  ? setCapital('')
                  : setCapital(e.target.value)
              }
              placeholder='1000'
              error={error}
              endAdornment={
                <InputAdornment position='end'>&nbsp;R$&nbsp;</InputAdornment>
              }
              aria-describedby='Capital'
              inputProps={{
                'aria-label': 'capital',
              }}
              size='small'
            />
            <FormHelperText>Capital</FormHelperText>
          </FormControl>
          <FormControl fullWidth={true}>
            <Input
              type='number'
              value={taxa}
              onChange={(e) =>
                e.target.value === '' ? setTaxa('') : setTaxa(e.target.value)
              }
              placeholder='10'
              error={error}
              endAdornment={<InputAdornment position='end'>%</InputAdornment>}
              aria-describedby='Taxa dos juros'
              inputProps={{
                'aria-label': 'taxa',
              }}
              size='small'
            />
            <FormHelperText>Taxa (ao Mês)</FormHelperText>
          </FormControl>
          <FormControl fullWidth={true}>
            <Input
              type='number'
              value={time}
              onChange={(e) =>
                e.target.value === '' ? setTime('') : setTime(e.target.value)
              }
              placeholder='12'
              error={error}
              aria-describedby='Tempo'
              inputProps={{
                'aria-label': 'tempo',
              }}
              size='small'
            />
            <FormHelperText>Tempo (em Meses)</FormHelperText>
          </FormControl>
        </Box>
        <Box display={'flex'} gap={{ xs: 2, sm: 5, md: 10 }} px={3}>
          <FormControl fullWidth={true}>
            <Input
              value={valorInicial}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
              aria-describedby='Valor investido'
              inputProps={{
                'aria-label': 'valor investido',
              }}
              color='#000'
              size='small'
              readOnly={true}
            />
            <FormHelperText>Valor investido</FormHelperText>
          </FormControl>
          <FormControl fullWidth={true}>
            <Input
              value={valorTotalEmJuros}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
              aria-describedby='Valor total em juros'
              inputProps={{
                'aria-label': 'valor total em juros',
              }}
              color='#000'
              size='small'
              readOnly={true}
            />
            <FormHelperText>Valor total em juros</FormHelperText>
          </FormControl>
          <FormControl fullWidth={true}>
            <Input
              value={valorFinal}
              endAdornment={<InputAdornment position='end'>R$</InputAdornment>}
              aria-describedby='Valor final'
              inputProps={{
                'aria-label': 'valor final',
              }}
              color='#000'
              size='small'
              readOnly={true}
            />
            <FormHelperText>Valor final</FormHelperText>
          </FormControl>
        </Box>
        <LineChart
          xAxis={[
            {
              dataKey: 'Tempo',
              data: Array.from({ length: timeXAxis }, (_, i) => i + 1),
              label: 'Tempo',
            },
          ]}
          series={[
            {
              id: 'juros',
              data: series,
              label: 'R$',
              color: '#222',
              area: true,
              showMark: false,
            },
          ]}
          height={460}
          sx={{
            '& .MuiAreaElement-series-juros': {
              fill: 'url("#juros")',
            },
          }}
          slotProps={{
            noDataOverlay: {
              message: 'Não há dados para exibir neste gráfico.',
            },
            popper: {
              placement: 'auto-start',
            },
          }}
        >
          <defs>
            <linearGradient id='juros' x1='50%' y1='0%' x2='50%' y2='100%'>
              <stop offset='0%' stopColor='#000' stopOpacity={0.8} />
              <stop offset='90%' stopColor='#000' stopOpacity={0.1} />
              <stop offset='100%' stopColor='#000' stopOpacity={0} />
            </linearGradient>
          </defs>
        </LineChart>
      </Box>
      <Footer />
    </Box>
  );
}
