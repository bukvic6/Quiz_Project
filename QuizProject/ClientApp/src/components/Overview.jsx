import React from 'react';
import { Flex, Card, CardHeader,Box, Heading, CardBody, Center, Text, Badge } from '@chakra-ui/react';

function RoundedBadge({ number }) {
    return (
        <Box
            width="100px"
            height="100px"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="white"
            color="#1D3557"
            fontSize="20px"
        >
            {number}
        </Box>
    );
}

function Overview({ questionCount, userCount, resultCount }) {
    return (
        <Card w='100%'>
            <CardHeader align='center'>
                <Heading color='#1D3557' size='xl'>Overview</Heading>
            </CardHeader>
            <CardBody>
                <Center gap={10}>
                    <Flex direction='column' align='center'>
                        <Text>Questions</Text>
                        <Badge borderRadius="50%" border="5px solid #1D3557" variant="solid" colorScheme="teal">
                            <RoundedBadge number={questionCount} />
                        </Badge>
                    </Flex>
                    <Flex direction='column' align='center'>
                        <Text>Users</Text>
                        <Badge borderRadius="50%" variant="solid" border="5px solid #E63946" colorScheme="teal">
                            <RoundedBadge number={userCount} />
                        </Badge>
                    </Flex>
                    <Flex direction='column' align='center'>
                        <Text>Solved</Text>
                        <Badge borderRadius="50%" variant="solid" border="5px solid #283618" colorScheme="teal">
                            <RoundedBadge number={resultCount} />
                        </Badge>
                    </Flex>
                </Center>
            </CardBody>
        </Card>
    );
}

export default Overview;