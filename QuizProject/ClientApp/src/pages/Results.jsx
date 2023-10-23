import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import moment from "moment";
import { TableContainer, Table, Thead, Th, Tr, Td, Tbody, CardFooter, Box, Center, Input, ButtonGroup, IconButton, Flex, Divider, AbsoluteCenter, CardHeader, Card, CardBody, Heading } from '@chakra-ui/react'
import { useNavigate } from "../../node_modules/react-router-dom/index";
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
import AdminService from "../services/AdminService";
import { FaTrophy } from 'react-icons/fa';

function Results() {
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [topResults, setTopResults] = useState([]);
    const [userResults, setUserResult] = useState([])
    const pageSize = 3;
    const topNumber = 4;
    const [pageNumber, setPageNumber] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const total = Math.ceil(rowCount / pageSize)

    const getCount = async () => {
        try {
            const { data } = await UserService.getResultCount();
            setRowCount(data);
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

    const getTopResults = async () => {
        try {
            const { data } = await UserService.getTopFive(topNumber)
            setTopResults(data);
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
    function formatDate(date) {
        var formattedDate = moment(date).format('D.M.YYYY HH:mm');
        return formattedDate
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
        getCount();
        getResults();
        getTopResults();
        getUserResults();
        getResults();
    }, [navigate, pageNumber])

    return (
        <Box>
            <Center>
                <Flex flexDirection='column'>
                    <Box position='relative' padding='10'>
                        <Divider />
                        <AbsoluteCenter bg='white' fontSize='xl' px='6'>
                            Quiz results
                        </AbsoluteCenter>
                    </Box>
                    <Flex flexDirection='row' gap={10} >
                        <Card align='center'>
                                <CardHeader>
                                    {role === 'ADMIN' ? (
                                            <Heading size='md'>All results</Heading>
                                    ) : role === 'USER' ? (
                                            <Heading size='md'>My Results</Heading>

                                    ) : null}
                                </CardHeader>
                            <CardBody>
                                {role === 'ADMIN' ? (
                                    <><TableContainer>
                                            <Table variant='striped' colorScheme='gray'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Username</Th>
                                                        <Th>Points</Th>
                                                        <Th>Date</Th>
                                                        <Th>Rating</Th>
                                                        <Th>Percentage</Th>

                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {results.map((val, key) => {
                                                        return (
                                                            <Tr key={key}>
                                                                <Td>{val.user}</Td>
                                                                <Td>{val.points}</Td>
                                                                <Td>{formatDate(val.date)}</Td>
                                                                <Td>{val.rating}</Td>
                                                                <Td>{val.percentage}</Td>

                                                            </Tr>
                                                        );
                                                    })}
                                                </Tbody>
                                            </Table>
                                        </TableContainer></>

                                ) : role === 'USER' ? (
                                        <><TableContainer w='700px'>
                                                <Table variant='striped' colorScheme='gray'>
                                                    <Thead>
                                                        <Tr>
                                                            <Th>Username</Th>
                                                            <Th>Points</Th>
                                                            <Th>Date</Th>
                                                            <Th>Rating</Th>
                                                            <Th>Percentage</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {userResults.map((val, key) => {
                                                            return (
                                                                <Tr key={key}>
                                                                    <Td>{val.user}</Td>
                                                                    <Td>{val.points}</Td>
                                                                    <Td>{formatDate(val.date)}</Td>
                                                                    <Td>{val.rating}</Td>
                                                                    <Td>{val.percentage} %</Td>
                                                                </Tr>
                                                            );
                                                        })}
                                                    </Tbody>
                                                </Table>
                                           </TableContainer></>

                                ) : null} 
                            </CardBody>
                            <CardFooter align='end'>
                                <ButtonGroup gap='2'>
                                    {pageNumber > 1 && <IconButton onClick={handlePreviousPage} icon={<ArrowBackIcon />} />}
                                    {pageNumber < total && <IconButton onClick={handleNextPage} icon={<ArrowForwardIcon />} />}                         
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                        <Card align='center'>
                            <CardHeader>
                                <Heading size='md'>TOP {topNumber}</Heading>
                            </CardHeader>
                            <CardBody>
                                <TableContainer >
                                    <Table variant='striped' colorScheme='orange'>
                                        <Thead>
                                            <Tr>
                                                <Th>Username</Th>
                                                    <Th>Points</Th>
                                                    <Th>Date</Th>
                                                    <Th>Rating</Th>
                                                    <Th>Percentage</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {topResults.map((val, key) => {
                                            return (
                                                <Tr key={key} >
                                                    <Td>{val.user}</Td>
                                                    <Td>{val.points}</Td>
                                                    <Td>{formatDate(val.date)}</Td>
                                                    <Td>{val.rating}</Td>
                                                    <Td>{val.percentage} %</Td>
                                                    <Td><FaTrophy color='#c9a132' /></Td>
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