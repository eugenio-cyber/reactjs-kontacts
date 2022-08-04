import {
  Box,
  Card,
  CardMedia,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImgLogin from '../../assets/login.png';
import SuccessBtn from '../../components/SuccessBtn';
import api from '../../services/api';
import { getItem, setItem } from '../../utils/storage';
import { box } from './styles.js';

const Login = () => {
  const navigate = useNavigate();
  const [warning, setWarning] = useState({
    email: false,
    password: false,
    text: '',
    tipe: '',
  });

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChangeEmail = (value) => {
    const localForm = { ...form };
    localForm.email = value;
    setForm({ ...localForm });
  };

  const handleChangePassword = (value) => {
    const localForm = { ...form };
    localForm.password = value;
    setForm({ ...localForm });
  };

  const checkInputs = () => {
    const filter = /\S+@\S+\.\S+/;
    const localWarning = { ...warning };
    localWarning.email = false;
    localWarning.password = false;

    if (!form.email || !filter.test(form.email)) {
      localWarning.email = true;
    }

    if (!form.password) {
      localWarning.password = true;
    }

    setWarning({ ...localWarning });

    if (form.email && form.password) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const localWarning = { ...warning };
    localWarning.password = false;
    setWarning({ ...localWarning });

    try {
      const response = await api.post('/login', {
        email: form.email,
        senha: form.password,
      });

      const { token } = response.data;

      setItem('token', token);

      localWarning.text = 'Login feito com sucesso!';
      localWarning.tipe = 'accepted';
      setWarning({ ...localWarning });

      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      localWarning.text = error.response.data;
      localWarning.tipe = 'error';

      setWarning({ ...localWarning });
    }
  };

  useEffect(() => {
    const token = getItem('token');

    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <Container disableGutters maxWidth="xl" sx={{ p: 0, display: 'flex' }}>
      <CardMedia
        component="img"
        image={ImgLogin}
        alt="Imagem login"
        sx={{ width: 1 / 2 }}
      />
      <Box component="div" sx={box}>
        <Card sx={{ width: '477px', boxShadow: 0, mb: '96px' }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 400, fontSize: '16px', mb: '9px' }}
          >
            Bem vindo
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: '32px', mb: '32px' }}
          >
            Faça o login com sua conta
          </Typography>
          <TextField
            fullWidth
            error={warning.email}
            id="outlined-basic"
            label="Email"
            onChange={(event) => handleChangeEmail(event.target.value)}
            variant="outlined"
            sx={{ mb: '32px' }}
          />
          <TextField
            fullWidth
            error={warning.password}
            type="password"
            id="outlined-basic"
            onChange={(event) => handleChangePassword(event.target.value)}
            label="Senha"
            variant="outlined"
            sx={{ mb: '62px' }}
          />
          {warning.text && (
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: 700,
                fontSize: '16px',
                mb: '10px',
                color: warning.tipe === 'accepted' ? '#04C45C' : '#FB0615A6',
              }}
            >
              {warning.text}
            </Typography>
          )}
          <SuccessBtn text="LOGIN" width="100%" onClick={checkInputs} />
        </Card>
        <Box component="div" sx={{ display: 'flex' }}>
          <Typography variant="h6" sx={{ fontWeight: 400, fontSize: '16px' }}>
            Não tem cadastro? ⠀
          </Typography>
          <Link to="/sign-up" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 400, fontSize: '16px', color: '#1972A8' }}
            >
              Clique aqui!
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
