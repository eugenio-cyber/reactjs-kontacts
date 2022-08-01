import { Button } from '@mui/material';

const SuccessBtn = ({ text, width, onClick }) => {
  return (
    <Button
      variant="contained"
      tipe="submit"
      onClick={() => onClick()}
      sx={{
        background: '#04C45C',
        '&:hover': { backgroundColor: '#04C45C' },
        height: '50px',
        borderRadius: '8px',
        width: { width },
      }}
    >
      {text}
    </Button>
  );
};

export default SuccessBtn;
