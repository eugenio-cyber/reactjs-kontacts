import { Box, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import IconClose from '../../assets/close.svg';
import DangerBtn from '../DangerBtn/index';
import SuccessBtn from '../SuccessBtn/index';
import { boxContainer, boxContent, subtitle, title } from './style';
import './styles.css';

const BasicModal = ({
  setModal,
  modal,
  currentContact,
  setCurrentContact,
  newContact,
  setNewContact,
  sendNewContact,
  updateContact,
  deleteContact,
}) => {
  const [warning, setWarning] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const handleCloseModal = () => {
    const localModal = { ...modal };
    localModal.title = '';
    localModal.active = false;

    const localWarning = { ...warning };
    localWarning.email = false;
    localWarning.phone = false;
    localWarning.name = false;

    setModal({ ...localModal });
    setWarning({ ...localWarning });
  };

  const handleChangeEmail = (value) => {
    if (modal.tipe === 'edit') {
      const localCurrentContact = { ...currentContact };
      localCurrentContact.email = value;
      setCurrentContact({ ...localCurrentContact });
    }
    if (modal.tipe === 'register') {
      const localNewContact = { ...newContact };
      localNewContact.email = value;
      setNewContact({ ...localNewContact });
    }
  };

  const handleChangeName = (value) => {
    if (modal.tipe === 'edit') {
      const localCurrentContact = { ...currentContact };
      localCurrentContact.nome = value;
      setCurrentContact({ ...localCurrentContact });
    }
    if (modal.tipe === 'register') {
      const localNewContact = { ...newContact };
      localNewContact.nome = value;
      setNewContact({ ...localNewContact });
    }
  };

  const handleChangePhone = (value) => {
    if (modal.tipe === 'edit') {
      const localCurrentContact = { ...currentContact };
      localCurrentContact.telefone = value;
      setCurrentContact({ ...localCurrentContact });
    }
    if (modal.tipe === 'register') {
      const localNewContact = { ...newContact };
      localNewContact.telefone = value;
      setNewContact({ ...localNewContact });
    }
  };

  const checkInputs = () => {
    const validationEmail = /\S+@\S+\.\S+/;
    const localWarning = { ...warning };
    localWarning.email = false;
    localWarning.phone = false;
    localWarning.name = false;

    if (modal.tipe === 'delete') {
      deleteContact();
    }

    if (modal.tipe === 'register') {
      if (!newContact.email || !validationEmail.test(newContact.email)) {
        localWarning.email = true;
      }

      if (
        !newContact.telefone ||
        newContact.telefone.length !== 11 ||
        newContact.telefone.includes('(') ||
        newContact.telefone.includes(')') ||
        newContact.telefone.includes('-')
      ) {
        localWarning.phone = true;
      }

      if (!newContact.nome) {
        localWarning.name = true;
      }

      setWarning({ ...localWarning });

      if (!localWarning.email && !localWarning.name && !localWarning.phone) {
        sendNewContact();
      }
    }

    if (modal.tipe === 'edit') {
      if (
        !currentContact.email ||
        !validationEmail.test(currentContact.email)
      ) {
        localWarning.email = true;
      }

      if (
        !currentContact.telefone ||
        currentContact.telefone.length !== 11 ||
        currentContact.telefone.includes('(') ||
        currentContact.telefone.includes(')') ||
        currentContact.telefone.includes('-')
      ) {
        localWarning.phone = true;
      }

      if (!currentContact.nome) {
        localWarning.name = true;
      }

      setWarning({ ...localWarning });

      if (!localWarning.email && !localWarning.name && !localWarning.phone) {
        updateContact();
      }
    }

    handleCloseModal();
  };

  const cleanCurrentContact = () => {
    setCurrentContact({});
  };

  return (
    <div>
      <Modal open={modal.active} onClose={() => handleCloseModal()}>
        <Box sx={boxContainer}>
          <Box sx={boxContent}>
            <img
              className="btn-close"
              src={IconClose}
              alt="Icon close"
              onClick={() => handleCloseModal()}
            />
            <Typography align="center" sx={title}>
              {modal.title}
            </Typography>
            {modal.tipe === 'delete' && (
              <>
                <Typography align="center" sx={subtitle}>
                  Deseja excluir o contato, {currentContact.nome}?
                </Typography>
                <Box
                  component="div"
                  sx={{
                    width: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <SuccessBtn
                    width="100%"
                    text="EXCLUIR"
                    onClick={() => checkInputs()}
                  />
                  <DangerBtn
                    width="100%"
                    text="CANCELAR"
                    onClick={cleanCurrentContact}
                  />
                </Box>
              </>
            )}
            {modal.tipe === 'edit' && (
              <>
                <TextField
                  fullWidth
                  error={warning.name}
                  onChange={(event) => handleChangeName(event.target.value)}
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  sx={{ mb: '17px' }}
                  value={currentContact.nome}
                />
                <TextField
                  fullWidth
                  error={warning.email}
                  onChange={(event) => handleChangeEmail(event.target.value)}
                  id="outlined-helperText"
                  label="E-mail"
                  variant="outlined"
                  sx={{ mb: '17px' }}
                  value={currentContact.email}
                />
                <TextField
                  fullWidth
                  error={warning.phone}
                  helperText={warning.phone && 'ex: 99999999999'}
                  onChange={(event) => handleChangePhone(event.target.value)}
                  id="outlined-basic"
                  label="Telefone"
                  variant="outlined"
                  sx={{ mb: '72px' }}
                  value={currentContact.telefone}
                />
                <Box
                  component="div"
                  sx={{
                    width: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <SuccessBtn
                    width="100%"
                    text="SALVAR"
                    onClick={() => checkInputs()}
                  />
                  <DangerBtn
                    width="100%"
                    text="CANCELAR"
                    onClick={cleanCurrentContact}
                  />
                </Box>
              </>
            )}
            {modal.tipe === 'register' && (
              <>
                <TextField
                  fullWidth
                  error={warning.name}
                  onChange={(event) => handleChangeName(event.target.value)}
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  sx={{ mb: '17px' }}
                />
                <TextField
                  fullWidth
                  error={warning.email}
                  onChange={(event) => handleChangeEmail(event.target.value)}
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                  sx={{ mb: '17px' }}
                />
                <TextField
                  fullWidth
                  helperText={warning.phone && 'ex: 99999999999'}
                  error={warning.phone}
                  onChange={(event) => handleChangePhone(event.target.value)}
                  id="outlined-basic"
                  label="Telefone"
                  variant="outlined"
                  sx={{ mb: '72px' }}
                />
                <Box
                  component="div"
                  sx={{
                    width: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <SuccessBtn
                    width="100%"
                    text="ADICIONAR"
                    onClick={() => checkInputs()}
                  />
                  <DangerBtn
                    width="100%"
                    text="LIMPAR"
                    onClick={cleanCurrentContact}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
