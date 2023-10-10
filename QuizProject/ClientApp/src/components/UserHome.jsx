import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { Card, CardHeader, Heading, CardFooter, Button, Radio, Center, Stack, RadioGroup, Divider, AbsoluteCenter, Box, Flex } from '@chakra-ui/react'
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
        <Box>
            <Center>
                <Flex flexDirection="column">
                    <Box position="relative" padding="10">
                        <Divider />
                        <AbsoluteCenter bg="white" px="4">
                            Quiz
                        </AbsoluteCenter>
                    </Box>
                    <Card w="500px" align="center">
                        {questions.length > 0 && (
                            <>
                                <CardHeader>
                                    <Heading size="md">Quiz Questions</Heading>
                                </CardHeader>
                                <div>
                                    {questions.map((question) => (
                                        <div key={question.id}>
                                            <h3>{question.questionText}</h3>
                                            <RadioGroup
                                            >
                                                <Stack direction="column">
                                                    {question.answers.map((answer) => (
                                                        <Radio
                                                            key={answer.id}
                                                            value={answer.answerText}
                                                            onChange={(e) => handleRadioChange(question.id, e.target.value)}
                                                        >
                                                            {answer.answerText}
                                                        </Radio>
                                                    ))}
                                                </Stack>
                                            </RadioGroup>
                                        </div>
                                    ))}
                                </div>
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