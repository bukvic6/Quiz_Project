import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TableContainer, Table, Image, CircularProgress, CircularProgressLabel, Thead, Spacer, Th, Tr, Td, Tbody, CardFooter, Box, Center, ButtonGroup, IconButton, Flex, CardHeader, Card, CardBody, Heading } from '@chakra-ui/react'
import { useNavigate } from "../../node_modules/react-router-dom/index";
import { ArrowLeftIcon, SearchIcon, ArrowRightIcon } from '@chakra-ui/icons'
import AdminService from "../services/AdminService";
import trophy from './../assets/trophy.png';

function Results() {
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [topResults, setTopResults] = useState([]);
    const pageSize = 3;
    const topNumber = 4;
    const [pageNumber, setPageNumber] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const total = Math.ceil(rowCount / pageSize)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const toggleRefresh = () => setRefresh(value => !value);

    const getCount = async () => {
        try {
            const { data } = await UserService.getResultCount(startDate, endDate);
            setRowCount(data);
        } catch {
            console.error("Error getting item count");
        }
    };

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
            const { data } = await AdminService.getResults(pageNumber, pageSize, startDate, endDate)
            setResults(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getTopResults = async () => {
        try {
            const { data } = await UserService.getTopFive(topNumber)
            setTopResults(data);
        } catch (error) {
            console.log(error);
        }
    };

    function formatDate(date) {
        var formattedDate = moment(date).format('D.M.YYYY HH:mm');
        return formattedDate;
    };

    const onChange = () => {
        setPageNumber(1);
        toggleRefresh();
    };

    useEffect(() => {
        const userDataJSON = localStorage.getItem('token');
        if (!userDataJSON) {
            navigate('/');
            return;
        }
        const userData = JSON.parse(userDataJSON);
        setRole(userData.role);
        getTopResults();
        getCount();
    }, []);


    useEffect(() => {
        getResults();
        getCount();
    }, [pageNumber]);

    return (
        <Box>
            <Center>
                <Flex flexDirection='column'>
                    <Flex flexDirection='column' gap={10} >
                        <Card align='center' w='70vw' bg='#1D3557' p='5px' borderWidth='3px' borderRadius='lg' boxShadow='2xl' rounded='md'>
                            <CardHeader>
                                <Heading color='#F1FAEE'>Our Winners</Heading>
                            </CardHeader>
                            <CardBody>
                                <Flex gap={ 5 } flexDirection='row'>
                                    {topResults.map((val, key) => {
                                        return (
                                            <Card borderWidth='3px' borderRadius='lg' w='200px' key={key} align='center'>

                                                <Heading as='h4' size='md' color='#1D3557' >{val.user}</Heading>
                                                <CardBody align='center' pb='10px'>
                                                    <Image boxSize='3em'  src={trophy }></Image>
                                                </CardBody>
                                                <CardFooter>
                                                    <CircularProgress size='50px' value={val.percentage} color='#A8DADC'>
                                                        <CircularProgressLabel>{ val.percentage } %</CircularProgressLabel>
                                                    </CircularProgress>
                                                </CardFooter>
                                            </Card>
                                        )
                                    })}

                                </Flex>
                            </CardBody>
                        </Card>
                        <Card align='center'>
                                <CardHeader>
                                    {role === 'ADMIN' ? (
                                    <Heading  size='md'>All results</Heading>
                                ) : role === 'USER' ? (
                                        <Heading as='h4' size='md' color='#1D3557'>My Results</Heading>

                                    ) : null}
                                </CardHeader>
                            <CardBody>
                                <Box bg="#457B9D" borderRadius="4px" p="4px">
                                    <Flex flexDirection='row' gap={10} align="center">
                                        <Spacer/>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            showTimeSelect
                                            placeholderText=" Start date"
                                            dateFormat="MMMM d, yyyy h:mm"
                                        />
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            placeholderText=" End date"
                                            showTimeSelect
                                            dateFormat="MMMM d, yyyy h:mm"
                                        />
                                        <IconButton fontSize='20px' onClick={onChange} icon={<SearchIcon />} />
                                        <Spacer/>
                                    </Flex>
                                </Box>
                                    <TableContainer>
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
                                </TableContainer>
                                                        
                            </CardBody>
                            <CardFooter align='end'>
                                <ButtonGroup gap='2'>
                                    {pageNumber > 1 && <IconButton isRound={true} fontSize='20px' color='#F1FAEE' bg='#457B9D' _active={{
                                        bg: '#dddfe2',
                                        transform: 'scale(1.28)',
                                        borderColor: '#F1FAEE',
                                    }} _hover={{ bg: '#1D3557' }} onClick={handlePreviousPage} icon={<ArrowLeftIcon />} />}
                                    {pageNumber < total && <IconButton isRound={true} color='#F1FAEE' bg='#457B9D' fontSize='20px' _active={{
                                        bg: '#dddfe2',
                                        transform: 'scale(1.28)',
                                        borderColor: '#F1FAEE',
                                    }} _hover={{ bg: '#1D3557' }} onClick={handleNextPage} icon={<ArrowRightIcon />} />}                           
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    </Flex>
                </Flex>
            </Center>
        </Box>
    )
}
export default Results;