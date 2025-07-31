import React, { useState, useEffect } from 'react';
import {
  AppShell,
  Header,
  Navbar,
  Main,
  Group,
  Text,
  Badge,
  Button,
  Card,
  Stack,
  Grid,
  Avatar,
  ActionIcon,
  Select,
  TextInput,
  Textarea,
  ScrollArea,
  Divider,
  Paper,
  Box,
  Flex,
  Tabs,
  ThemeIcon,
  UnstyledButton,
  Container,
  Space,
  Tooltip,
  Menu,
  Input,
  Indicator
} from '@mantine/core';

const CallCenterUI = () => {
  // Agent status state
  const [currentAgentStatus, setCurrentAgentStatus] = useState('Available');
  const [agents, setAgents] = useState([
    { id: 1, name: 'Sarah Johnson', status: 'Available', avatar: 'SJ', lastSeen: new Date() },
    { id: 2, name: 'Mike Chen', status: 'Busy', avatar: 'MC', lastSeen: new Date() },
    { id: 3, name: 'Emily Davis', status: 'Away', avatar: 'ED', lastSeen: new Date() },
    { id: 4, name: 'David Wilson', status: 'Available', avatar: 'DW', lastSeen: new Date() },
    { id: 5, name: 'Lisa Garcia', status: 'Busy', avatar: 'LG', lastSeen: new Date() }
  ]);

  // Active calls state
  const [activeCalls, setActiveCalls] = useState([
    { id: 1, name: 'Bob', queue: 'Charlie Q', duration: '01:21:47:43', status: 'active' },
    { id: 2, name: 'John Smith', queue: 'Charlie Q', duration: '01:21:46:53', status: 'active' },
    { id: 3, name: 'Unknown', queue: 'Charlie Q', duration: '00:32', status: 'active' }
  ]);

  const [selectedCall, setSelectedCall] = useState(activeCalls[0]);
  const [chatMessage, setChatMessage] = useState('');
  const [interactionStatus, setInteractionStatus] = useState('Close: Resolved');

  // Chat history
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'Charlie Hagelskamp',
      initials: 'CH',
      time: '8:08 AM',
      message: 'Charlie Hagelskamp answered interaction'
    },
    {
      id: 2,
      sender: 'System',
      initials: 'SY',
      time: '8:08 AM',
      message: 'Placed interaction on hold'
    },
    {
      id: 3,
      sender: 'System',
      initials: 'SY',
      time: '8:08 AM',
      message: 'Removed interaction from hold'
    },
    {
      id: 4,
      sender: 'System',
      initials: 'SY',
      time: '8:08 AM',
      message: 'Muted the interaction'
    }
  ]);

  // Mock real-time agent status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        status: Math.random() > 0.95 ? 
          ['Available', 'Busy', 'Away'][Math.floor(Math.random() * 3)] : 
          agent.status
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'green';
      case 'Busy': return 'red';
      case 'Away': return 'yellow';
      default: return 'gray';
    }
  };

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'You',
        initials: 'YU',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        message: chatMessage
      };
      setChatHistory(prev => [...prev, newMessage]);
      setChatMessage('');
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 60, breakpoint: 'sm' }}
      padding={0}
      styles={{
        main: { backgroundColor: '#f8f9fa' },
        header: { backgroundColor: '#dc3545', border: 'none' },
        navbar: { backgroundColor: '#495057', border: 'none' }
      }}
    >
      {/* Header */}
      <Header height={60} p="sm">
        <Group justify="space-between" h="100%">
          <Group>
            <Box 
              style={{ 
                backgroundColor: 'white', 
                color: '#dc3545', 
                padding: '4px 8px', 
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              A
            </Box>
          </Group>
          
          <Group>
            <ActionIcon variant="transparent" c="white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </ActionIcon>
            <Badge 
              color="green" 
              variant="filled" 
              leftSection={<Box w={8} h={8} bg="white" style={{ borderRadius: '50%' }} />}
            >
              Available
            </Badge>
            <ActionIcon variant="transparent" c="white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </ActionIcon>
            <ActionIcon variant="transparent" c="white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
              </svg>
            </ActionIcon>
          </Group>
        </Group>
      </Header>

      {/* Sidebar */}
      <Navbar width={{ base: 60 }} p="xs">
        <Stack gap="sm" align="center">
          <Tooltip label="Home" position="right">
            <ActionIcon variant="transparent" c="white" size="lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
            </ActionIcon>
          </Tooltip>
          
          <Tooltip label="Search" position="right">
            <ActionIcon variant="transparent" c="white" size="lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </ActionIcon>
          </Tooltip>
          
          <Tooltip label="Analytics" position="right">
            <ActionIcon variant="transparent" c="white" size="lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18"/>
                <path d="m19 9-5 5-4-4-3 3"/>
              </svg>
            </ActionIcon>
          </Tooltip>
          
          <Tooltip label="Calls" position="right">
            <ActionIcon variant="filled" color="blue" size="lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/>
              </svg>
            </ActionIcon>
          </Tooltip>
        </Stack>
      </Navbar>

      <Main>
        <Container fluid p={0}>
          {/* Active Calls Tabs */}
          <Box bg="white" p="xs" style={{ borderBottom: '1px solid #dee2e6' }}>
            <Group gap="xs">
              <Group gap="xs">
                <Select
                  value="Home"
                  data={['Home', 'Queue', 'Personal']}
                  size="sm"
                  w={100}
                  rightSection={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  }
                />
              </Group>
              
              {activeCalls.map((call, index) => (
                <UnstyledButton
                  key={call.id}
                  onClick={() => setSelectedCall(call)}
                  p="xs"
                  style={{
                    backgroundColor: selectedCall?.id === call.id ? '#e3f2fd' : 'transparent',
                    borderRadius: '4px',
                    border: selectedCall?.id === call.id ? '1px solid #2196f3' : '1px solid #dee2e6'
                  }}
                >
                  <Group gap="xs">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={index === 0 ? '#2196f3' : index === 1 ? '#ff9800' : '#4caf50'} stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <div>
                      <Text size="sm" fw={500}>{call.name}</Text>
                      <Text size="xs" c="dimmed">Q: {call.queue}</Text>
                    </div>
                    <Text size="xs" c="dimmed">{call.duration}</Text>
                    <ActionIcon size="xs" variant="transparent">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </ActionIcon>
                  </Group>
                </UnstyledButton>
              ))}
            </Group>
          </Box>

          <Grid m={0} gutter={0}>
            {/* Left Panel - Call Controls and Customer Info */}
            <Grid.Col span={4} p="md" style={{ backgroundColor: 'white', borderRight: '1px solid #dee2e6' }}>
              {/* Call Control Buttons */}
              <Group justify="center" mb="md">
                <ActionIcon size="lg" color="red" variant="filled">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </ActionIcon>
                <ActionIcon size="lg" color="blue" variant="filled">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/>
                  </svg>
                </ActionIcon>
                <ActionIcon size="lg" color="gray" variant="filled">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                </ActionIcon>
                <ActionIcon size="lg" color="teal" variant="filled">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 4v6h6"/>
                    <path d="M23 20v-6h-6"/>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                  </svg>
                </ActionIcon>
                <ActionIcon size="lg" color="teal" variant="filled">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </ActionIcon>
              </Group>

              <Group mb="md">
                <ActionIcon variant="light">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 4v6h6"/>
                    <path d="M23 20v-6h-6"/>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                  </svg>
                </ActionIcon>
                <ActionIcon variant="light">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 6,2 18,2 18,9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                </ActionIcon>
              </Group>

              {/* Customer Info */}
              <Card withBorder radius="md" mb="md">
                <Group justify="center" mb="md">
                  <Avatar size="xl" color="blue">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </Avatar>
                </Group>
                
                <Stack gap="xs">
                  <div>
                    <Text size="sm" fw={500} c="dimmed">Name</Text>
                    <Text size="sm">4202272</Text>
                  </div>
                  
                  <div>
                    <Text size="sm" fw={500} c="dimmed">Email</Text>
                    <Text size="sm"></Text>
                  </div>
                </Stack>
              </Card>

              {/* Status Dropdown */}
              <Select
                value={interactionStatus}
                onChange={setInteractionStatus}
                data={[
                  'Close: Resolved',
                  'Close: Unresolved',
                  'Transfer',
                  'Escalate',
                  'Follow-up Required'
                ]}
                mb="md"
                styles={{
                  input: { backgroundColor: '#17a2b8', color: 'white', fontWeight: 500 }
                }}
              />

              {/* Queue Info */}
              <Stack gap="xs" mb="md">
                <Text size="sm">Q | Charlie Q</Text>
                <Text size="sm"># | Charlie Number</Text>
              </Stack>

              {/* Form Fields */}
              <Stack gap="md">
                <div>
                  <Text size="sm" fw={500} mb="xs">Subject</Text>
                  <TextInput value="New phone inbound" readOnly />
                </div>
                
                <div>
                  <Text size="sm" fw={500} mb="xs">Interaction Type</Text>
                  <Select
                    placeholder="Select type"
                    data={['Phone', 'Email', 'Chat', 'SMS']}
                  />
                </div>
                
                <div>
                  <Text size="sm" fw={500} mb="xs">End Result</Text>
                  <Select
                    placeholder="Select result"
                    data={['Resolved', 'Transferred', 'Escalated', 'Follow-up']}
                  />
                </div>
                
                <div>
                  <Text size="sm" fw={500} mb="xs">Notes</Text>
                  <Textarea
                    placeholder="Notes"
                    minRows={3}
                  />
                </div>
              </Stack>
            </Grid.Col>

            {/* Right Panel - Chat/Activity Feed */}
            <Grid.Col span={8} p={0}>
              <Box h="calc(100vh - 120px)" style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Action Icons */}
                <Group p="md" justify="flex-end" style={{ borderBottom: '1px solid #dee2e6' }}>
                  <ActionIcon variant="light">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </ActionIcon>
                  <ActionIcon variant="light">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </ActionIcon>
                  <ActionIcon variant="light">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="m22 21-3-3"/>
                      <path d="M22 11h-2"/>
                      <path d="M22 7h-4"/>
                    </svg>
                  </ActionIcon>
                </Group>

                {/* Chat History */}
                <ScrollArea flex={1} p="md">
                  <Box ta="center" mb="md">
                    <Badge variant="light" size="lg">Today</Badge>
                  </Box>
                  
                  <Stack gap="md">
                    {chatHistory.map((message) => (
                      <Paper key={message.id} p="md" bg="#f8f9fa" radius="md">
                        <Group align="flex-start">
                          <Avatar size="sm" color="teal">
                            {message.initials}
                          </Avatar>
                          <Box flex={1}>
                            <Group gap="xs" mb="xs">
                              <Text size="sm" fw={500}>{message.sender}</Text>
                              <Text size="xs" c="dimmed">{message.time}</Text>
                              <ActionIcon size="xs" variant="transparent">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                  <circle cx="9" cy="7" r="4"/>
                                  <path d="m22 21-3-3"/>
                                  <path d="M22 11h-2"/>
                                  <path d="M22 7h-4"/>
                                </svg>
                              </ActionIcon>
                            </Group>
                            <Text size="sm">{message.message}</Text>
                          </Box>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </ScrollArea>

                {/* Message Input */}
                <Box p="md" style={{ borderTop: '1px solid #dee2e6' }}>
                  <Group>
                    <TextInput
                      placeholder="Type your message"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      flex={1}
                      styles={{
                        input: { backgroundColor: '#fff3cd' }
                      }}
                    />
                    <ActionIcon variant="light">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 16.2a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                      </svg>
                    </ActionIcon>
                    <ActionIcon variant="light">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                        <line x1="9" y1="9" x2="9.01" y2="9"/>
                        <line x1="15" y1="9" x2="15.01" y2="9"/>
                      </svg>
                    </ActionIcon>
                    <ActionIcon variant="light">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="m22 21-3-3"/>
                        <path d="M22 11h-2"/>
                        <path d="M22 7h-4"/>
                      </svg>
                    </ActionIcon>
                    <ActionIcon 
                      color="blue" 
                      variant="filled"
                      onClick={sendChatMessage}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                      </svg>
                    </ActionIcon>
                  </Group>
                </Box>
              </Box>
            </Grid.Col>
          </Grid>

          {/* Agent Status Panel - Floating */}
          <Paper 
            shadow="lg" 
            p="md" 
            style={{ 
              position: 'fixed', 
              top: '80px', 
              right: '20px', 
              width: '280px',
              zIndex: 1000
            }}
          >
            <Text fw={600} mb="md">Team Status</Text>
            <Stack gap="xs">
              {agents.map((agent) => (
                <Group key={agent.id} justify="space-between">
                  <Group gap="xs">
                    <Indicator color={getStatusColor(agent.status)} size={8}>
                      <Avatar size="sm" color="blue">{agent.avatar}</Avatar>
                    </Indicator>
                    <div>
                      <Text size="sm" fw={500}>{agent.name}</Text>
                      <Text size="xs" c="dimmed">{agent.status}</Text>
                    </div>
                  </Group>
                  <ActionIcon 
                    size="sm" 
                    variant="light"
                    onClick={() => {
                      const newMessage = {
                        id: Date.now(),
                        sender: `Chat with ${agent.name}`,
                        initials: agent.avatar,
                        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                        message: `Started consultation with ${agent.name}`
                      };
                      setChatHistory(prev => [...prev, newMessage]);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </ActionIcon>
                </Group>
              ))}
            </Stack>
          </Paper>
        </Container>
      </Main>
    </AppShell>
  );
};

export default CallCenterUI;