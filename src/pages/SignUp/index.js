import {
  Box,
  Card,
  CardMedia,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ImgSignUp from '../../assets/sign-up.png';
import DangerBtn from '../../components/DangerBtn';
import SuccessBtn from '../../components/SuccessBtn';
import { box } from './styles.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const SignUp = () => {
  const navigate = useNavigate();
  const [warning, setWarning] = useState({
    name: false,
    email: false,
    password: false,
    text: '',
    tipe: '',
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChangeEmail = (value) => {
    const localForm = { ...form };
    localForm.email = value;
    setForm({ ...localForm });
  };

  const handleChangeName = (value) => {
    const localForm = { ...form };
    localForm.name = value;
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
    localWarning.name = false;

    if (!form.email || !filter.test(form.email)) {
      localWarning.email = true;
    }

    if (!form.password) {
      localWarning.password = true;
    }

    if (!form.name) {
      localWarning.name = true;
    }

    setWarning({ ...localWarning });

    if (form.email && form.name && form.password) {
      localWarning.password = false;
      setWarning({ ...localWarning });
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const localWarning = { ...warning };
    try {
      await api.post('/usuarios', {
        nome: form.name,
        email: form.email,
        senha: form.password,
      });

      localWarning.text = 'Usuário cadastrado com sucesso!';
      localWarning.tipe = 'accepted';
      setWarning({ ...localWarning });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      localWarning.text = error.response.data;
      localWarning.tipe = 'error';

      setWarning({ ...localWarning });
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Container disableGutters maxWidth="xl" sx={{ p: 0, display: 'flex' }}>
      <Box component="div" sx={box}>
        <Card sx={{ width: '477px', boxShadow: 0, mb: '86px' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '24px',
              mb: '40px',
              textAlign: 'center',
            }}
          >
            Cadastre-se
          </Typography>
          <TextField
            fullWidth
            error={warning.name}
            id="outlined-basic"
            onChange={(event) => handleChangeName(event.target.value)}
            label="Nome"
            variant="outlined"
            sx={{ mb: '16px' }}
          />
          <TextField
            fullWidth
            error={warning.email}
            id="outlined-basic"
            onChange={(event) => handleChangeEmail(event.target.value)}
            label="Email"
            variant="outlined"
            sx={{ mb: '16px' }}
          />
          <TextField
            error={warning.password}
            fullWidth
            type="password"
            onChange={(event) => handleChangePassword(event.target.value)}
            id="outlined-basic"
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
          <Box
            component="div"
            sx={{
              width: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <SuccessBtn text="CADASTRAR" width="100%" onClick={checkInputs} />
            <DangerBtn text="CANCELAR" width="100%" onClick={handleCancel} />
          </Box>
        </Card>
        <Box component="div" sx={{ display: 'flex' }}>
          <Typography variant="h6" sx={{ fontWeight: 400, fontSize: '16px' }}>
            Já tem cadastro? ⠀
          </Typography>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 400, fontSize: '16px', color: '#1972A8' }}
            >
              Clique aqui!
            </Typography>
          </Link>
        </Box>
      </Box>
      <CardMedia
        component="img"
        image={ImgSignUp}
        alt="Imagem cadastro"
        sx={{ width: 1 / 2 }}
      />
    </Container>
  );
};

export default SignUp;
