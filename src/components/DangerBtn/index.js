import { Button } from '@mui/material';

const DangerBtn = ({ text, width, onClick }) => {
  return (
    <Button
      fullWidth
      onClick={() => onClick()}
      variant="contained"
      sx={{
        background: '#FB0615A6',
        '&:hover': { backgroundColor: '#FB0615A6' },
        height: '50px',
        borderRadius: '8px',
        width: { width },
      }}
    >
      {text}
    </Button>
  );
};

export default DangerBtn;
