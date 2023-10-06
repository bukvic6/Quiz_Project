import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { Card, CardHeader, Heading, CardBody, Text, CardFooter, Button, Input, Center, Divider, AbsoluteCenter, Box, Flex, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useNavigate } from "../../node_modules/react-router-dom/index";



 
function UserHome() {
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState(0);
    const [index, setIndex] = useState(0);

    const getQuestions = async (e) => {
        try {
            const { data } = await UserService.getQuestions();
            setQuestions(data);
            setQuestion(data[index]); 
        } catch (error) {
            console.log(error);
        }
    }
    const sendForm = async (id) => {
        const updatedUserAnswers = [
            ...userAnswers, { questionId: id, SelectedAnswerId: answer }
        ]
        setUserAnswers(updatedUserAnswers)
        try {
            await UserService.answerQuestion(updatedUserAnswers);
            navigate("/results")
        } catch (error) {
            console.log(error);
        }
    }
    const goBack = (e) => {

        if (index > 0) {
            setIndex(index - 1);
            const answer = userAnswers[index - 1]
            setAnswer(answer.selectedAnswerId)
            console.log(answer)
            setQuestion(questions[index - 1]);
        }

    }

    function handleClick(id) {
        const existingIndex = userAnswers.findIndex((item) => item.questionId === id);
        if (existingIndex !== -1) {
            const updatedUserAnswers = [...userAnswers];
            updatedUserAnswers[existingIndex].selectedAnswerId = answer;
            setUserAnswers(updatedUserAnswers);
        } else {
            setUserAnswers([...userAnswers, { questionId: id, selectedAnswerId: answer }])
        }
        if (index < questions.length - 1) {
            setIndex(index + 1);
            setQuestion(questions[index + 1]);
        }
        if (userAnswers[index + 1] != undefined) {
            setAnswer(userAnswers[index + 1].selectedAnswerId)
        } else {
            setAnswer(0);
        }


    }
    useEffect(() => {
        getQuestions();
    },[]);
    return (
        <Box>
            <Center>
                <Flex flexDirection='column'>
                    <Box position='relative' padding='10'>
                        <Divider />
                        <AbsoluteCenter bg='white' px='4'>
                            Quiz
                        </AbsoluteCenter>
                    </Box>
                    <Card w='500px' align = 'center'>
                        {question && (
                                <>
                                <CardHeader>
                                <Heading size='md'> >>> {question.questionText} ?</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text>{question.answers}</Text>
                                    <RadioGroup onChange={setValue} value={value}>
                                        <Stack direction='row'>
                                            <Radio value='1'>First</Radio>
                                            <Radio value='2'>Second</Radio>
                                            <Radio value='3'>Third</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </CardBody>
                                <CardFooter gap={2}>
                                    <Flex flexDirection="column" gap={ 5 }>
                                        <Flex gap={4}>
                                            {index != 0 && (
                                                <IconButton icon={<ArrowBackIcon />} flex='1' onClick={ goBack }></IconButton>

                                                ) }
                                                <Input flex='1' value={answer} onChange={e => setAnswer(e.target.value)}></Input>
                                                {index != questions.length - 1 ? (
                                                    <IconButton icon={<ArrowForwardIcon />} flex='1' onClick={() => handleClick(question.id)}></IconButton>
                                                ) : (
                                                <Button colorScheme='red' onClick={() => sendForm(question.id)}>Finish</Button>
                                                )} 
                                        </Flex>
                                        <Center>
                                        </Center>
                                    </Flex>
                                </CardFooter>
                            </>

                        )}
                    </Card>
                    </Flex>
            </Center>
        </Box>

    )
}
export default UserHome;