import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { TableContainer, Table, Thead, Th, Tr, Td, Tbody, Box, Center, Input, ButtonGroup, IconButton, Flex, Divider, AbsoluteCenter, CardHeader, Card, CardBody, Heading } from '@chakra-ui/react'
import { useNavigate } from "../../node_modules/react-router-dom/index";
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
import AdminService from "../services/AdminService";



function Results() {
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [topFive, setTopFive] = useState([]);
    const [userResults, setUserResult] = useState([])
    const pageSize = 3;
    const [pageNumber, setPageNumber] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const total = Math.ceil(rowCount / pageSize)

    const getCount = async (userRole) => {
        try {
            if (userRole === 'ADMIN') {
                var results = 'results'
                const { data } = await AdminService.getCount(results);
                setRowCount(data);
                console.log("ADMIN : GET RESLTS COUNT")

                console.log(data);

            } else if (userRole === 'USER'){
                const { data } = await UserService.getResultCount();
                setRowCount(data);
                console.log("USER : GET RESLTS COUNT")
                console.log(data);
            }
        } catch {
            console.error("Error getting item count");
        }
    }

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleNextPage = () => {
        var hasMorePages = pageNumber < total;
        if (hasMorePages === true) {
            setPageNumber(pageNumber + 1);
        }
    };

    const getResults = async () => {
        try {
            const { data } = await AdminService.getResults(pageNumber, pageSize)
            setResults(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }           
    }

    const getTopFive = async () => {
        try {
            const { data } = await UserService.getTopFive()
            setTopFive(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getUserResults = async () => {
        try {
            const { data } = await UserService.getUserResults(pageNumber, pageSize)
            setUserResult(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const userDataJSON = localStorage.getItem('token');
        if (!userDataJSON) {
            navigate('/');
            return;
        }
        const userData = JSON.parse(userDataJSON);
        const userRole = userData.role;
        console.log(userRole)
        setRole(userRole);
        getCount(userRole);
        getResults();
        getTopFive();
        getUserResults();
        getResults();
    }, [navigate, pageNumber])

    return (
        <Box>
            <Center>
                <Flex flexDirection='column'>
                    <Box position='relative' padding='10'>
                        <Divider />
                        <AbsoluteCenter bg='white' px='6'>
                            Quiz results
                        </AbsoluteCenter>
                    </Box>
                    <Flex flexDirection='row' gap={10} >
                        <Card align='center'>
                            <CardBody>
                                <ButtonGroup gap='2'>
                                    <Input placeholder='Search' />
                                    <IconButton onClick={handlePreviousPage} icon={<ArrowBackIcon />} />
                                    <IconButton onClick={handleNextPage} icon={<ArrowForwardIcon />} />
                                </ButtonGroup>
                                {role === 'ADMIN' ? (
                                    <><CardHeader>
                                    <Heading size='md'>All results</Heading>
                                    </CardHeader><TableContainer w='400px'>
                                            <Table variant='striped' colorScheme='gray'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Username</Th>
                                                        <Th>Points</Th>

                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {results.map((val, key) => {
                                                        return (
                                                            <Tr key={key}>
                                                                <Td>{val.user}</Td>
                                                                <Td>{val.points}</Td>
                                                            </Tr>
                                                        );
                                                    })}
                                                </Tbody>
                                            </Table>
                                        </TableContainer></>

                                ) : role === 'USER' ? (
                                        <><CardHeader>
                                         <Heading size='md'> My results</Heading>
                                        </CardHeader><TableContainer w='400px'>
                                                <Table variant='striped' colorScheme='gray'>
                                                    <Thead>
                                                        <Tr>
                                                            <Th>Username</Th>
                                                            <Th>Points</Th>

                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {userResults.map((val, key) => {
                                                            return (
                                                                <Tr key={key}>
                                                                    <Td>{val.user}</Td>
                                                                    <Td>{val.points}</Td>
                                                                </Tr>
                                                            );
                                                        })}
                                                    </Tbody>
                                                </Table>
                                            </TableContainer></>

                                ) : null} 
                            </CardBody>
                        </Card>
                        <Card align='center'>
                            <CardHeader>
                                <Heading size='md'>TOP 5</Heading>
                            </CardHeader>
                            <CardBody>
                            <TableContainer w='400px'>
                                <Table variant='striped' colorScheme='blue'>
                                    <Thead>
                                        <Tr>
                                            <Th>Username</Th>
                                            <Th>Points</Th>

                                        </Tr>
                                    </Thead>
                                        <Tbody>
                                            {topFive.map((val, key) => {
                                            return (
                                                <Tr key={key} >
                                                    <Td>{val.user}</Td>
                                                    <Td>{val.points}</Td>
                                                </Tr>
                                            )
                                        })}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            </CardBody>
                        </Card>
                    </Flex>
                </Flex>
            </Center>
        </Box>
    )
}
export default Results;