import { useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import Popup from "reactjs-popup";
import "./AdminHome.css";
import { nanoid } from 'nanoid';
import {
    TableContainer,
    Table,
    Thead,
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
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'

function AdminHome() {
    const [question, setQuestion] = useState("");
    const [answers, setAnswer] = useState([]);
    const [solution, setSolution] = useState("");
    const [questionId, setQuestionId] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [isPopupOpen, setPopoupOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [answerList, setAnswerList] = useState([]);
    const [value, setValue] = useState("");

    const getQuestions = async () => {
        const { data } = await AdminService.getQuestions();
        setQuestions(data);
    };
    function addAnswerToList() {
        if (isEditing === true) {
            const ans = {
                answerText: value,
            }
            setAnswer([...answers, ans]);
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


    function deleteFromAnswerList(id) {
        if (isEditing === true) {
            const newList = answers.filter((item) => {
                return item.id !== id
            })
            setAnswer(newList);
        } else {

            const newList = answerList.filter((item) => {
                return item.id !== id
            })
            setAnswerList(newList);
        }

    }
    const addQuestion = async (e) => {
        e.preventDefault();
        let newAnswerList = answerList.map((item) => {
            return { answerText: item.answerText };
        })
        const questions = {
            questionText: question,
            answers: newAnswerList,
            rightAnswer: solution,
        };
        try {
            const { data } = await AdminService.createQuestion(questions);
            setQuestion("");
            setAnswer([]);
            setSolution("");
            getQuestions();
            setPopoupOpen(false);
        } catch (error) {
            console.log(error);
        }
    };
    const changeQuestion = async (e) => {
        e.preventDefault();
        const questions = {
            id: questionId,
            questionText: question,
            answers: answers,
            rightAnswer: solution,
        };
        try {
            await AdminService.updateQuestion(questions);
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
    }, []);
    return (
        <Box>
            <Center>
                <Flex flexDirection="column">
                    {
                        <Popup
                            className="popup-content"
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
                                                    <Input
                                                        variant="filled"
                                                        type="text"
                                                        value={question}
                                                        onChange={(e) => setQuestion(e.target.value)}
                                                        placeholder="Enter question."
                                                        _placeholder={{ opacity: 1, color: "gray.600" }}
                                                        name="question"
                                                    ></Input>
                                                </FormControl>
                                                <VStack>
                                                    {isEditing ? (
                                                        answers.map((ans) => (
                                                            <HStack spacing="10px" w="200px" key={ans.id}>
                                                                <Flex w="300px" h="10px" justifyContent="space-between" flexDirection="row">
                                                                    <Text>{ans.answerText}</Text>
                                                                    <Flex w="10px">
                                                                        <DeleteIcon color="red.500" mr="2" onClick={() => deleteFromAnswerList(ans.id)} />
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
                                                                    <DeleteIcon color="red.500" mr="2" onClick={() => deleteFromAnswerList(ans.id)} />
                                                                </Flex>
                                                            </HStack>
                                                        ))
                                                    )}
                                                </VStack>
                                                <Stack spacing={5}>
                                                    <Input
                                                        mt={5}
                                                        value={value}
                                                        variant="outline"
                                                        type="text"
                                                        placeholder="Enter answer."
                                                        onChange={(e) => setValue(e.target.value)}
                                                    ></Input>
                                                    <Button colorScheme="teal" onClick={addAnswerToList}>
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
                                                        <Button colorScheme="teal" size="md" type="submit">
                                                            {isEditing ? "Update" : "Add"}
                                                        </Button>
                                                        <Button
                                                            className="button"
                                                            onClick={() => {
                                                                console.log("modal closed");
                                                                setAnswerList([])
                                                                close();
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
                    <Box position="relative" padding="10">
                        <Button
                            
                            colorScheme="blue"
                            onClick={() => {
                                setIsEditing(false);
                                setPopoupOpen(true);
                            }}
                        >
                            Add new question
                        </Button>
                        <Divider />
                        <AbsoluteCenter bg="white" px="4">
                            Question list
                        </AbsoluteCenter>
                    </Box>
                    <TableContainer w="70vw">
                        <Table variant="striped" colorScheme="blackAlpha">
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
                                                        colorScheme="red"
                                                        size="md"
                                                        onClick={() => handleDelete(val.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        colorScheme="blue"
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
                </Flex>
            </Center>
        </Box>
    );
}
export default AdminHome;
