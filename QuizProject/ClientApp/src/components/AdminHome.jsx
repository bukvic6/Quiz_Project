
import { useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import Popup from "reactjs-popup";
import "./AdminHome.css";
import { nanoid } from 'nanoid';
import {
    TableContainer,
    Table,
    Thead,
    Textarea,
    Th,
    Tr,
    Td,
    Tbody,
    Box,
    HStack,
    VStack,
    Text,
    Heading,
    Center,
    Flex,
    Button,
    FormControl,
    Input,
    Divider,
    AbsoluteCenter,
    Stack,
    IconButton,
    ButtonGroup,
    CardHeader,
    Card,
    CardBody,
    CardFooter
} from "@chakra-ui/react";
import { ArrowLeftIcon, DeleteIcon, AddIcon, ArrowRightIcon } from '@chakra-ui/icons'


function AdminHome() {
    const [question, setQuestion] = useState("");
    const [answers, setAnswer] = useState([]);
    const [solution, setSolution] = useState("");
    const [questionId, setQuestionId] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [isPopupOpen, setPopoupOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [answerList, setAnswerList] = useState([]);
    const [answerToDelete, setAnswerToDelete] = useState([]);
    const [value, setValue] = useState("");
    const [rowCount, setRowCount] = useState(0);
    const pageSize = 3;
    const [pageNumber, setPageNumber] = useState(1);
    const total = Math.ceil(rowCount / pageSize)

    const getQuestions = async () => {
        try {
            const { data } = await AdminService.getQuestions(pageNumber, pageSize);
            setQuestions(data);
        }
        catch {
            console.error("Error fetching data")
        }
    };

    const getCount = async () => {
        try {
            const { data } = await AdminService.getCount();
            setRowCount(data)
        }
        catch {
            console.error("Error getting item count")
        }
    }

    const deleteAnswer = async () => {
        await AdminService.deleteAnswer(answerToDelete);
    }

    function addAnswerToList() {
        if (isEditing === true) {
            const ans = {
                id: nanoid(),
                answerText: value,
            }
            setAnswer([...answers, ans]);
            console.log(ans.id);
            setAnswerList([...answerList, ans]);
            console.log(answers);
            setValue("")
        }
        else {
            const ans = {
                id: nanoid(),
                answerText: value,
            };
            console.log(ans.id);
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

    function deleteFromAnswerList(id) {
        if (isEditing === true) {
            if (typeof id === "string") {
                const newList = answers.filter((item) => {
                    return item.id !== id
                })
                setAnswer(newList);
            }
            else {
                console.log(id);
                setAnswerToDelete([...answerToDelete, id])
                const newList = answers.filter((item) => {
                    return item.id !== id
                })
                console.log(answerToDelete);
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
            setAnswerList([])
            getCount();
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
            setAnswer([]);
            setAnswerList([])
            getQuestions();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (questionId) => {
        try {
            await AdminService.deleteQuestion(questionId);
            getQuestions();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateClick = (questionData) => {
        setQuestion(questionData.questionText);
        setAnswer(questionData.answers);
        setSolution(questionData.rightAnswer);
        setQuestionId(questionData.id);
        setIsEditing(true);
        setPopoupOpen(true);
    };

    useEffect(() => {
        getQuestions();
        getCount();
    }, [pageNumber]);
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
                                <Center>
                                    <form onSubmit={isEditing ? changeQuestion : addQuestion}>
                                        <Box>
                                            <Flex flexDirection="column" gap={6}>
                                                <Center>
                                                    <Heading as="h4" size="md">
                                                        {isEditing ? "Update question" : "Add question"}
                                                    </Heading>
                                                </Center>
                                                <FormControl isRequired>
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
                                                <Stack spacing={5}>
                                                    <Textarea 
                                                        mt={5}
                                                        value={value}
                                                        variant="outline"
                                                        type="text"
                                                        placeholder="Enter answer."
                                                        onChange={(e) => setValue(e.target.value)}
                                                    ></Textarea >
                                                    <Button border='2px' borderColor='#1D3557' color='#F1FAEE' bg='#457B9D' onClick={addAnswerToList}>
                                                        Add Answer
                                                    </Button>
                                                </Stack>
                                                <FormControl isRequired>
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
                                        </Box>
                                    </form>
                                </Center>
                            )}
                        </Popup>
                    }
                    <Box position="relative" fontSize='xl' padding="10">
                        <Divider />
                        <AbsoluteCenter color='#1D3557' bg="white" px="4">
                            Admin dashboard
                        </AbsoluteCenter>
                    </Box>
                    <Card>                    
                        <CardHeader align='center'>
                            <Heading color='#1D3557' size='xl'>Questions</Heading>
                            <Box p='4'>
                                <Button 
                                    color='#F1FAEE' bg='#457B9D' _hover={{ bg: '#1D3557' }}
                                    onClick={() => {
                                        setIsEditing(false);
                                        setPopoupOpen(true);
                                    }}>Add question
                                </Button>
                            </Box>
                        </CardHeader>
                        <CardBody>
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
                                    <Tbody>
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
                </Flex>
            </Center>
        </Box>
    );
}
export default AdminHome;