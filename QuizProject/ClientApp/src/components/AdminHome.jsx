
import { useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import Popup from "reactjs-popup";
import "./AdminHome.css";
import Overview from './Overview.jsx'
import { nanoid } from 'nanoid';
import {
    TableContainer,
    Table,
    Thead,
    Textarea,
    Th,
    Tr,
    Td,
    FormLabel,
    Tbody,
    Box,
    HStack,
    VStack,
    Text,
    Heading,
    Center,
    Spacer,
    Flex,
    Button,
    FormControl,
    Input,
    Stack,
    IconButton,
    ButtonGroup,
    CardHeader,
    Card,
    CardBody,
} from "@chakra-ui/react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend } from 'chart.js';
import { ArrowLeftIcon, DeleteIcon, SearchIcon, ArrowRightIcon } from '@chakra-ui/icons'


function AdminHome() {
    const [question, setQuestion] = useState("");
    const [answers, setAnswer] = useState([]);
    const [solution, setSolution] = useState("");
    const [questionId, setQuestionId] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [users, setUsers] = useState([]);
    const [isPopupOpen, setPopoupOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [answerList, setAnswerList] = useState([]);
    const [answerToDelete, setAnswerToDelete] = useState([]);
    const [statistic, setStatistic] = useState([]);
    const [value, setValue] = useState("");
    const [search, setSearch] = useState("");
    const [userSearch, setUserSearch] = useState("");
    const [questionCount, setQuestionCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [resultCount, setResultCount] = useState(0);
    const pageSize = 3;
    const [pageNumber, setPageNumber] = useState(1);
    const total = Math.ceil(questionCount / pageSize)
    const labels = statistic.map((item) => item.questionText);
    const wrongCount = statistic.map((item) => item.wrongCount);
    const correctCount = statistic.map((item) => item.correctCount);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const getQuestions = async () => {
        try {
            const { data } = await AdminService.getQuestions(pageNumber, pageSize, search);
            setQuestions(data);
        }
        catch {
            console.error("Error fetching questions")
        }
    };

    const getStats = async () => {
        try {
            const { data } = await AdminService.getStatistic();
            setStatistic(data);
        }
        catch {
            console.error("Error fetching questions")
        }
    };

    const getUsers = async () => {
        try {
            const { data } = await AdminService.getUsers(userSearch);
            setUsers(data);
        }
        catch {
            console.error("Error fetching users")
        }
    };

    const getCount = async () => {
        try {
            const { data } = await AdminService.getCount(search);
            setQuestionCount(data)
        }
        catch {
            console.error("Error getting item count")
        }
    }

    const getUserCount = async () => {
        try {
            const { data } = await AdminService.getUserCount();
            setUserCount(data)
        }
        catch {
            console.error("Error getting user count")
        }
    }

    const getResultCount = async () => {
        try {
            const { data } = await AdminService.getResultCount();
            setResultCount(data)
        }
        catch {
            console.error("Error getting result count")
        }
    }

    const deleteAnswer = async () => {
        await AdminService.deleteAnswer(answerToDelete);
    }

    function addAnswerToList() {
        if (value == "") {
            return;
        }
        if (isEditing === true) {
            const ans = {
                id: nanoid(),
                answerText: value,
            }
            setAnswer([...answers, ans]);
            setAnswerList([...answerList, ans]);
            setValue("")
        }
        else {
            const ans = {
                id: nanoid(),
                answerText: value,
            };
            setAnswerList([...answerList, ans]);
            setValue("");
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

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Correct Count',
                data: correctCount,
                backgroundColor: '#457B9D',
            },
            {
                label: 'Incorrect Count',
                data: wrongCount,
                backgroundColor: '#e5989b',
            },
        ],
    };

    function deleteFromAnswerList(id)  {
        if (isEditing === true) {
            if (typeof id === "string") {
                const newList = answers.filter((item) => {
                    return item.id !== id
                })
                setAnswer(newList);
            }
            else {
                const newList = answers.filter((item) => {
                    return item.id !== id
                })
                setAnswerToDelete([...answerToDelete, id])
                setAnswer(newList);
            }
            console.log(answers)
        } else {
            const newList = answerList.filter((item) => {
                return item.id !== id
            })
            setAnswerList(newList);
        }

    }

    const addQuestion = async (e) => {
        e.preventDefault();
        setPopoupOpen(false);
        let newAnswerList = answerList.map((item) => {
            return { answerText: item.answerText };
        })
        const questions = {
            questionText: question,
            answers: newAnswerList,
            rightAnswer: solution,
        };
        try {
            await AdminService.createQuestion(questions);
            setQuestion("");
            setAnswer([]);
            setSolution("");
            getQuestions();
            setAnswerList([]);
            getCount();
            getStats();
        } catch (error) {
            console.log(error);
        }
    };

    const changeQuestion = async (e) => {
        e.preventDefault();
        setPopoupOpen(false);
        let newAnswerList = answers.filter(x => typeof x.id === "string").map((item) => {
            return { answerText: item.answerText }
        })
        const questions = {
            id: questionId,
            questionText: question,
            answers: newAnswerList,
            rightAnswer: solution,
        };
        try {
            await AdminService.updateQuestion(questions);
            deleteAnswer();
            getQuestions();
            getStats();
            setAnswerToDelete([]);
            setAnswer([]);
            setAnswerList([])
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (questionId) => {
        try {
            await AdminService.deleteQuestion(questionId);
            getQuestions();
            getStats();
            getCount();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = () => {
        setPageNumber(1);
        getQuestions();
        getCount();
        setSearch("");
    }

    const handleUserSearch = () => {
        setPageNumber(1);
        getUsers();
        getCount();
        setUserSearch("");
    }

    const handleUpdateClick = (questionData) => {
        setQuestion(questionData.questionText);
        setAnswer(questionData.answers);
        setSolution(questionData.rightAnswer);
        setQuestionId(questionData.id);
        setIsEditing(true);
        setPopoupOpen(true);
    };

    useEffect(() => {
        getUsers();
        getCount();
        getResultCount();
        getStats();
        getUserCount();
    }, []);

    useEffect(() => {
        getQuestions();
    }, [pageNumber])
    return (
        <Box>
            <Center>
                <Flex flexDirection="column">
                    {
                        <Popup
                            class="popup-content-ADMIN"
                            open={isPopupOpen}
                            closeOnDocumentClick={false}
                            onClose={() => {
                                setPopoupOpen(false);
                                setIsEditing(false);
                                setQuestion("");
                                setAnswer("");
                                setSolution("");
                            }}
                            modal
                            nested
                        >
                            {(close) => (
                            <Box w="100%">
                                <Center >
                                    <form onSubmit={isEditing ? changeQuestion : addQuestion}>
                                            <Flex flexDirection="column" gap={6}>
                                                <Heading as="h4" size="md">
                                                    {isEditing ? "Update question" : "Add question"}
                                                </Heading>
                                                <Flex flexDirection="row" gap={ 10 }>
                                                    <Flex flexDirection="column">
                                                        <FormControl isRequired>
                                                            <FormLabel>Question text</FormLabel>
                                                            <Textarea                                                      
                                                                variant="filled"
                                                                type="text"
                                                                value={question}
                                                                onChange={(e) => setQuestion(e.target.value)}
                                                                placeholder="Enter question."
                                                                _placeholder={{ opacity: 1, color: "gray.600" }}
                                                                name="question"
                                                            ></Textarea >
                                                        </FormControl>
                                                        <FormControl isRequired>
                                                            <FormLabel>Solution</FormLabel>
                                                            <Input
                                                                variant="filled"
                                                                type="text"
                                                                value={solution}
                                                                onChange={(e) => setSolution(e.target.value)}
                                                                placeholder="Enter solution."
                                                                _placeholder={{ opacity: 1, color: "gray.600" }}
                                                                name="soluton"
                                                            ></Input>
                                                        </FormControl>
                                                    </Flex>
                                                    <Flex flexDirection="column" gap={ 3 }>
                                                        <FormLabel>Option</FormLabel>

                                                            <Textarea
                                                                value={value}
                                                                variant="outline"
                                                                type="text"
                                                                placeholder="Enter option."
                                                                onChange={(e) => setValue(e.target.value)}
                                                            ></Textarea >

                                                        <Stack spacing={5}>
                                                            <VStack>
                                                                {isEditing ? (
                                                                    answers.map((ans) => (
                                                                        <HStack spacing="10px" w="200px" key={ans.id}>
                                                                            <Flex w="300px" h="10px" justifyContent="space-between" flexDirection="row">
                                                                                <Text>{ans.answerText}</Text>
                                                                                <Flex w="10px">
                                                                                    <DeleteIcon cursor='pointer' color="#E63946" mr="2" onClick={() => deleteFromAnswerList(ans.id)} />
                                                                                </Flex>
                                                                            </Flex>
                                                                        </HStack>
                                                                    ))
                                                                ) : (
                                                                    answerList.map((ans) => (
                                                                        <HStack spacing="10px" w="200px" key={ans.id}>
                                                                            <Flex w="300px" h="10px" justifyContent="space-between" flexDirection="row">
                                                                                <Text>{ans.answerText}</Text>
                                                                            </Flex>
                                                                            <Flex w="10px">
                                                                                <DeleteIcon cursor='pointer' color="#E63946" mr="2" onClick={() => deleteFromAnswerList(ans.id)} />
                                                                            </Flex>
                                                                        </HStack>
                                                                    ))
                                                                )}
                                                            </VStack>    
                                                            <Button border='2px' borderColor='#1D3557' color='#F1FAEE' bg='#457B9D' onClick={addAnswerToList}>
                                                                Add Answer
                                                            </Button>
                                                        </Stack>                                                  
                                                    </Flex>
                                                </Flex>
                                                <Center>
                                                    <Flex className="actions" gap={4}>
                                                        <Button bg='#1D3557' color='#F1FAEE' size="md" _hover={{ bg: '#457B9D' }} type="submit">
                                                            {isEditing ? "Update" : "Add"}
                                                        </Button>
                                                        <Button
                                                            className="button"
                                                            onClick={() => {
                                                                console.log("modal closed");
                                                                setAnswerList([])
                                                                setAnswerToDelete([])
                                                                setPopoupOpen(false);
                                                            }}
                                                        >
                                                            Close
                                                        </Button>
                                                    </Flex>
                                                </Center>
                                            </Flex>
                                    </form>
                                </Center>
                            </Box>
                            )}
                        </Popup>
                    }
                    <Flex flexDirection="row" w="90vw" gap={3} >
                        <Box w='60vw'>
                            <Flex direction='column' gap={7}>
                                <Card>                    
                                <CardHeader align='center'>
                                        <Heading color='#1D3557' size='xl'>Questions</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Flex gap={ 4 }>
                                            <Input w='300px' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
                                            <IconButton onClick={handleSearch} icon={<SearchIcon />} />
                                            <Spacer />
                                            <Button 
                                                color='#F1FAEE' bg='#457B9D' _hover={{ bg: '#1D3557' }}
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setPopoupOpen(true);
                                                }}>Add question
                                            </Button>
                                        </Flex>
                                        <TableContainer w="70vw">
                                            <Table variant="striped" color='#1D3557'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Question</Th>
                                                        <Th>Answers</Th>
                                                        <Th>Solution</Th>
                                                        <Th>Delete/Update</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody >
                                                    {questions.map((val, key) => {
                                                        return (
                                                            <Tr key={key}>
                                                                <Td>{val.questionText}</Td>
                                                                <Td>
                                                                    {val.answers.map((item) => item.answerText).join(", ")}
                                                                </Td>
                                                                <Td>{val.rightAnswer}</Td>
                                                                <Td>
                                                                    <Stack direction="row" spacing={4}>
                                                                        <Button
                                                                            color='#F1FAEE' bg='#e63946'
                                                                            size="md"
                                                                            onClick={() => handleDelete(val.id)}
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                        <Button
                                                                            color='#F1FAEE' bg='#1D3557'
                                                                            size="md"
                                                                            onClick={() => handleUpdateClick(val)}
                                                                        >
                                                                            Update
                                                                        </Button>
                                                                    </Stack>
                                                                </Td>
                                                            </Tr>
                                                        );
                                                    })}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </CardBody>
                                        <Box align='center' mb='20px'>
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
                                        </Box>
                                </Card>
                                <Card h='500px' p='2'>
                                    <CardHeader align='center'>
                                        <Heading color='#1D3557' size='xl'>Question statistic</Heading>
                                    </CardHeader>
                                    <CardBody>
                                        <Line width={120} height={30} data={chartData} options={options} />
                                    </CardBody>
                                </Card>
                            </Flex>
                        </Box>
                        <Box w='30vw'>
                            <Flex flexDirection='column' gap={8}>
                                <Overview
                                    questionCount={questionCount}
                                    userCount={userCount}
                                    resultCount={resultCount}></Overview>

                                <Card>
                                    <CardHeader align='center'>
                                        <Heading color='#1D3557' size='xl'>Users</Heading>                            
                                    </CardHeader>
                                    <CardBody>
                                        <Flex gap={4}>
                                            <Input w='300px' value={userSearch} onChange={(e) => setUserSearch(e.target.value)} placeholder='Search' />
                                            <IconButton onClick={handleUserSearch} icon={<SearchIcon />} />
                                        </Flex>
                                        <TableContainer w="70vw">
                                            <Table variant="striped" colorScheme="blue" color='#1D3557'>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Username</Th>
                                                        <Th>Email</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody >
                                                    {users.map((val, key) => {
                                                        return (
                                                            <Tr key={key}>
                                                                <Td>{val.name}</Td>
                                                                <Td>{val.email}</Td>
                                                            </Tr>
                                                        );
                                                    })}
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </CardBody>

                                </Card>
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
            </Center>
        </Box>
    );
};
 const options = {
     responsive: true,
};

export default AdminHome;