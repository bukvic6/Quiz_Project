import { useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import { TableContainer, Table, Thead, Th, Tr, Td, Tbody, Box, Center, Flex, Button, FormControl, Input, Divider, AbsoluteCenter, FormErrorMessage } from '@chakra-ui/react'

function AdminHome() {
    const [question, setQuestion] = useState("");
    const [answers, setAnswer] = useState("");
    const [solution, setSolution] = useState("");
    const [questions, setQuestions] = useState([]);


    const getQuestions = async () => {
        const { data } = await AdminService.getQuestions() 
        setQuestions(data);

    }
    const addQuestion = async (e) => {
        e.preventDefault();
        const questions = { questionText: question, answers: answers, rightAnswer: solution }
        try {
            const { data } = await AdminService.createQuestion(questions);
            setQuestion('');
            setAnswer('');
            setSolution('');
            getQuestions();
        } catch (error) {
            console.log(error);
        }
    }
    const isError = question === '';

    const handleDelete = async (questionId) => {
        try {
            await AdminService.deleteQuestion(questionId);
            getQuestions();
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        getQuestions();
    }, []);
    return (
        <Box>
            <Center>
                <Flex flexDirection='column'>


                    <Box>

                            <form onSubmit={addQuestion}>
                            <Flex gap={6}>
                                <FormControl isRequired>
                                    <Input variant='filled' type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter question." _placeholder={{ opacity: 1, color: 'gray.600' }} name="question"></Input>
                                </FormControl>
                                <FormControl isRequired>
                                <Input variant='filled' type="text" value={answers} onChange={(e) => setAnswer(e.target.value)} placeholder="Enter answers." _placeholder={{ opacity: 1, color: 'gray.600' }} name="answers"></Input>
                                </FormControl>
                                <FormControl isRequired>
                                <Input variant='filled' type="text" value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="Enter solution." _placeholder={{ opacity: 1, color: 'gray.600' }} name="soluton"></Input>
                                </FormControl>
                                <Button colorScheme='teal' size='md' type="submit">Add</Button>
                                </Flex>
                        </form>
                    </Box>
                    <Box position='relative' padding='10'>
                        <Divider />
                        <AbsoluteCenter bg='white' px='4'>
                            Question list
                        </AbsoluteCenter>
                    </Box>
                <TableContainer w='70vw'>
                        <Table variant='striped' colorScheme='blackAlpha'>
                        <Thead>
                            <Tr>
                                <Th>Question</Th>
                                <Th>Answers</Th>
                                <Th>Solution</Th>
                                <Th> Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {questions.map((val, key) => {
                                return (
                                    <Tr key={key}>
                                        <Td>{val.questionText}</Td>
                                        <Td>{val.answers}</Td>
                                        <Td>{val.rightAnswer}</Td>
                                        <Td>
                                            <Button colorScheme='red' size='md' onClick={() => handleDelete(val.id)}>Delete</Button>
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                </Flex>
            </Center>
        </Box>

    )
}
export default AdminHome;