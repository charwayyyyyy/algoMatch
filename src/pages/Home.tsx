import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
} from '@mui/material';

interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

const SAMPLE_CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: 'Binary Search Implementation',
    description: 'Implement a binary search algorithm to find a target value in a sorted array.',
    difficulty: 'Easy',
    category: 'Searching',
  },
  {
    id: 2,
    title: 'Merge Sort Algorithm',
    description: 'Implement the merge sort algorithm to sort an array in ascending order.',
    difficulty: 'Medium',
    category: 'Sorting',
  },
  {
    id: 3,
    title: 'Graph Traversal',
    description: 'Implement both BFS and DFS for a given graph structure.',
    difficulty: 'Hard',
    category: 'Graphs',
  },
];

const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
  switch (difficulty) {
    case 'Easy':
      return 'success';
    case 'Medium':
      return 'warning';
    case 'Hard':
      return 'error';
    default:
      return 'default';
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [challenges] = useState<Challenge[]>(SAMPLE_CHALLENGES);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Algorithm Challenges
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        {challenges.map((challenge) => (
          <Card
            key={challenge.id}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.2s ease-in-out',
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="h2">
                {challenge.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {challenge.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={challenge.difficulty}
                  color={getDifficultyColor(challenge.difficulty)}
                  size="small"
                />
                <Chip label={challenge.category} size="small" />
              </Box>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => navigate(`/challenge/${challenge.id}`)}
              >
                Start Challenge
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Home;