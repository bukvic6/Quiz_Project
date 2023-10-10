import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { Card, CardHeader, Heading, CardFooter, Button, Radio, Center, Stack, RadioGroup, Divider, AbsoluteCenter, CardBody, Box, Flex } from '@chakra-ui/react'
import { useNavigate } from "../../node_modules/react-router-dom/index";



 
function UserHome() {
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);

    const getQuestions = async (e) => {
        try {
            const { data } = await UserService.getQuestions();
            setQuestions(data);
            setUserAnswers(data.map((question) => ({ questionId: question.id, userAnswer: null })));
        } catch (error) {
            console.log(error);
        }
    }

    const handleRadioChange = (questionId, selectedAnswerText) => {
        setUserAnswers((prevUserAnswers) =>
            prevUserAnswers.map((userAnswer) =>
                userAnswer.questionId === questionId
                    ? { ...userAnswer, userAnswer: selectedAnswerText }
                    : userAnswer
            )
        );
        console.log(userAnswers);
    }
    const handleSubmit = async () => {
        try {
            await UserService.answerQuestion(userAnswers);
            navigate("/results")
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getQuestions();
    },[]);
    return (
        <Box  bgGradient="radial(gray.300, blue.600, pink.200)" >
            <Center>
                <Flex flexDirection="column">
                    <Box position="relative" padding="10">
                        <Divider />
                        <AbsoluteCenter  px="10">
                        </AbsoluteCenter>
                    </Box>
                    <Card w="70vw" align="center" background='#d5dfed' >
                        {questions.length > 0 && (
                            <>
                                <CardHeader>
                                    <Heading color={"blue.700"} fontFamily={ "mono"} size="md">Quiz Questions</Heading>
                                </CardHeader>
                                <Stack spacing='4' w="50vw">
                                    {questions.map((question) => (
                                        <Card key={question.id} h="200px" alignItems={"center"}>

                                            <CardHeader>
                                                <Heading size='md'>{question.questionText}</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <RadioGroup
                                                >
                                                    <Stack direction="row" spacing='10'>
                                                        {question.answers.map((answer) => (
                                                            <Radio size='lg' name='1' colorScheme='pink'
                                                                key={answer.id}
                                                                value={answer.answerText}
                                                                onChange={(e) => handleRadioChange(question.id, e.target.value)}
                                                            >
                                                                {answer.answerText}
                                                            </Radio>
                                                        ))}
                                                    </Stack>
                                                </RadioGroup>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </Stack>
                                <CardFooter gap={2}>
                                    <Button onClick={handleSubmit}>Submit</Button>
                                </CardFooter>
                            </>
                        )}
                    </Card>
                </Flex>
            </Center>
        </Box>
    );
}


    

export default UserHome;