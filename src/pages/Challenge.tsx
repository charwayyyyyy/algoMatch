import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
} from '@mui/material';

interface TestCase {
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
}

const SAMPLE_CHALLENGES = {
  '1': {
    title: 'Binary Search Implementation',
    description: 'Implement a binary search algorithm that finds the index of a target value in a sorted array. If the target is not found, return -1.',
    initialCode: `function binarySearch(arr: number[], target: number): number {
  // Your implementation here
  return -1;
}
`,
    testCases: [
      { input: '[1, 2, 3, 4, 5], 3', expectedOutput: '2' },
      { input: '[1, 2, 3, 4, 5], 6', expectedOutput: '-1' },
      { input: '[-5, -2, 0, 1, 2], 0', expectedOutput: '2' },
    ],
  },
};

const Challenge = () => {
  const { id } = useParams<{ id: string }>();
  const challenge = SAMPLE_CHALLENGES[id as keyof typeof SAMPLE_CHALLENGES];
  
  const [code, setCode] = useState(challenge?.initialCode || '');
  const [testCases, setTestCases] = useState<TestCase[]>(challenge?.testCases || []);
  const [error, setError] = useState<string | null>(null);

  const runTests = () => {
    try {
      // Create a function from the code string
      const userFunction = new Function('arr', 'target', `
        ${code}
        return binarySearch(arr, target);
      `);

      const updatedTestCases = testCases.map(testCase => {
        try {
          // Parse input string to get array and target
          const [arrStr, targetStr] = testCase.input.split(',');
          const arr = JSON.parse(arrStr);
          const target = parseInt(targetStr);

          // Run the function
          const result = userFunction(arr, target);
          const actualOutput = result.toString();
          const passed = actualOutput === testCase.expectedOutput;

          return { ...testCase, actualOutput, passed };
        } catch (e) {
          return { ...testCase, actualOutput: 'Error', passed: false };
        }
      });

      setTestCases(updatedTestCases);
      setError(null);
    } catch (e) {
      setError('Error in code compilation: ' + (e as Error).message);
    }
  };

  if (!challenge) {
    return (
      <Container>
        <Typography variant="h4">Challenge not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              {challenge.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {challenge.description}
            </Typography>
          </Paper>
          <Paper sx={{ height: 'calc(100vh - 400px)', minHeight: '400px' }}>
            <Editor
              height="100%"
              defaultLanguage="typescript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </Paper>
        </Box>
        <Box>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={runTests}
                fullWidth
              >
                Run Tests
              </Button>
            </Box>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <List>
              {testCases.map((testCase, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText
                      primary={`Test Case ${index + 1}`}
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            Input: {testCase.input}
                          </Typography>
                          <Typography variant="body2">
                            Expected: {testCase.expectedOutput}
                          </Typography>
                          {testCase.actualOutput && (
                            <Typography
                              variant="body2"
                              color={testCase.passed ? 'success.main' : 'error.main'}
                            >
                              Output: {testCase.actualOutput}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < testCases.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Challenge;