import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 'bold',
            '&:hover': { opacity: 0.8 }
          }}
          onClick={() => navigate('/')}
        >
          AlgoMatch
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            Challenges
          </Button>
          <Button color="inherit" onClick={() => navigate('/leaderboard')}>
            Leaderboard
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/profile')}
          >
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;