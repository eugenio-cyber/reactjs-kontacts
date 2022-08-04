import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconDelete from '../../assets/cash.svg';
import IconLogOut from '../../assets/log-out.svg';
import IconEdit from '../../assets/pencil.svg';
import BasicModal from '../../components/Modal';
import api from '../../services/api';
import { getItem, removeItem } from '../../utils/storage';
import './styles.css';
import { box } from './styles.js';

const Home = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    title: '',
    active: false,
    tipe: '',
  });
  const [newContact, setNewContact] = useState({
    nome: '',
    email: '',
    telefone: '',
  });
  const [currentContact, setCurrentContact] = useState({});
  const [contacts, setContacts] = useState([]);

  const handleEditContact = (contact) => {
    const localModal = { ...modal };
    localModal.title = 'Editar Contato';
    localModal.active = true;
    localModal.tipe = 'edit';

    setModal({ ...localModal });
    setCurrentContact({ ...contact });
  };

  const handleRegisterContact = () => {
    const localModal = { ...modal };
    localModal.title = 'Cadastrar Contato';
    localModal.active = true;
    localModal.tipe = 'register';

    setModal({ ...localModal });
  };

  const handleDeleteContact = (contact) => {
    const localModal = { ...modal };
    localModal.title = 'Confirma a exclusão?';
    localModal.active = true;
    localModal.tipe = 'delete';

    setModal({ ...localModal });
    setCurrentContact({ ...contact });
  };

  const handleLogout = () => {
    removeItem('token');
    navigate('/');
  };

  const getContacts = async () => {
    try {
      const { data: contacts } = await api.get('/contatos', {
        headers: {
          Authorization: 'Bearer ' + getItem('token'),
        },
      });

      setContacts([...contacts]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendNewContact = async () => {
    try {
      await api.post(
        '/contatos',
        {
          ...newContact,
        },
        {
          headers: {
            Authorization: 'Bearer ' + getItem('token'),
          },
        }
      );

      getContacts();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateContact = async () => {
    try {
      await api.put(
        `/contatos/${currentContact.id}`,
        {
          ...currentContact,
        },
        {
          headers: {
            Authorization: 'Bearer ' + getItem('token'),
          },
        }
      );

      getContacts();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteContact = async () => {
    try {
      await api.delete(
        `/contatos/${currentContact.id}`,

        {
          headers: {
            Authorization: 'Bearer ' + getItem('token'),
          },
        }
      );

      getContacts();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const token = getItem('token');

    if (!token) {
      navigate('/login');
    }

    getContacts();
  }, [navigate]);

  return (
    <Container
      disableGutters
      maxWidth="xl"
      sx={{
        p: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: '#134563', height: '70px' }}
      >
        <Toolbar sx={{ width: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="h6" sx={{ mr: '84vh' }}>
            KONTACTS
          </Typography>
          <img
            onClick={handleLogout}
            src={IconLogOut}
            alt="Icon log out"
            className="icon__log-out cursor-pointer"
          />
        </Toolbar>
      </AppBar>
      <Box component="div" sx={box}>
        <Button
          onClick={() => handleRegisterContact()}
          variant="contained"
          sx={{
            background: '#04C45C',
            '&:hover': { backgroundColor: '#04C45C' },
            height: '50px',
            borderRadius: '8px',
            width: '235px',
          }}
        >
          Adicionar
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#F4F0F0' }}>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow
                  key={contact.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {contact.nome}
                  </TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.telefone}</TableCell>
                  <TableCell align="right">
                    <img
                      onClick={() => handleEditContact(contact)}
                      className="icon__edit cursor-pointer"
                      src={IconEdit}
                      alt="Icon edit"
                    />
                    <img
                      onClick={() => handleDeleteContact(contact)}
                      className="cursor-pointer"
                      src={IconDelete}
                      alt="Icon delete"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <BasicModal
        setModal={setModal}
        modal={modal}
        currentContact={currentContact}
        setCurrentContact={setCurrentContact}
        newContact={newContact}
        setNewContact={setNewContact}
        sendNewContact={sendNewContact}
        updateContact={updateContact}
        deleteContact={deleteContact}
      />
    </Container>
  );
};

export default Home;
