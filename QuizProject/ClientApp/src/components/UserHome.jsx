import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import {
    Heading,
    Button,
    Center,
    IconButton,
    Card,
    Image,
    Box,
    CardBody,
    Progress,
    CircularProgress,
    Text,
    CircularProgressLabel,
    Flex,
    Spacer,
} from "@chakra-ui/react";
import snail from './../assets/snail.png';
import hen from './../assets/hen.png';
import fox from './../assets/fox.png';
import mouse from './../assets/mouse.png';
import penguin from './../assets/penguin.png';

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@chakra-ui/icons'
import { useNavigate } from "../../node_modules/react-router-dom/index";
import "./UserHome.css";

function UserHome() {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const getQuestions = async (e) => {
        console.log("hey")
        try {
            const { data } = await UserService.getQuestions();
            setQuestions(data);
            setUserAnswers(
                data.map((question) => ({ questionId: question.id, userAnswer: null }))
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleAnswer = (questionId, selectedAnswerText) => {
        console.log(selectedAnswerText);
        console.log(questionId);

        setUserAnswers((prevUserAnswers) =>
            prevUserAnswers.map((userAnswer) =>
                userAnswer.questionId === questionId
                    ? { ...userAnswer, userAnswer: selectedAnswerText }
                    : userAnswer
            )
        );
        console.log(userAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }

    const handleSubmit = async () => {
        try {
            const { data } = await UserService.answerQuestion(userAnswers);
            setPercentage(data);
            setShowScore(true);
        } catch (error) {
            console.log(error);
        }
    };

    const redirectToResults = () => {
        navigate("/results");
    };

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <Center mt='50px'>
            <Card bg='#1D3557' w='60%' h='600px' p='60px' borderWidth='3px' borderRadius='lg'>
                {showScore ? (
                    <>
                    <CardBody>
                            <Flex direction="row" gap={10}>
                                <Box flex='1'>
                                    <CircularProgress value={percentage} size='420px' color='#A8DADC'>
                                        <CircularProgressLabel fontSize='50px' color='#F1FAEE'>{percentage} %</CircularProgressLabel>
                                    </CircularProgress>
                                </Box>
                            <Box flex='1'>
                                    {percentage > 80 ? (
                                        <Flex direction='column' gap={4} alignItems='center'>
                                            <Image boxSize='21em' src={penguin} alt="penguin" objectFit='cover' />
                                            <Text color='#F1FAEE' fontSize='30px'>Excellent</Text>
                                        </Flex>
                                    ) : (percentage > 60) ? (
                                        <Flex direction='column' gap={4} alignItems='center'>
                                                <Image boxSize='21em' src={fox} alt="fox" objectFit='cover' />
                                            <Text color='#F1FAEE' fontSize='30px'>Wow very good</Text>
                                        </Flex>
                                    ) : percentage > 50? (
                                        <Flex direction='column' gap={4} alignItems='center'>
                                                    <Image boxSize='21em' src={snail} alt="snail" objectFit='cover' />
                                                    <Text color='#F1FAEE' fontSize='30px'>Meh, you can do better</Text>
                                        </Flex>
                                    ) :
                                    percentage > 20  ? (
                                        <Flex direction='column' gap={4} alignItems='center'>
                                                        <Image boxSize='21em' src={hen} alt="hen" objectFit='cover' />
                                            <Text color='#F1FAEE' fontSize='30px'>Not so good</Text>
                                        </Flex>
                                    ) : (
                                    <Flex direction='column' gap={ 4 } alignItems='center'>
                                                            <Image boxSize='21em' src={mouse} alt="mouse" objectFit='cover' />
                                        <Text color='#F1FAEE' fontSize='30px'>Very very bad</Text>
                                    </Flex>
                                )}
                            </Box>
                        </Flex>
                        </CardBody>
                        <Box  align="center" >
                            <Button size='md'
                                height='48px'
                                width='200px'
                                border='2px'
                                bg='#1D3557' _active={{
                                    bg: '#dddfe2',
                                    transform: 'scale(0.98)',
                                    borderColor: '#F1FAEE',
                                }} _hover={{ bg: '#457B9D' }} color='#A8DADC' onClick={redirectToResults}>
                                Results
                            </Button>
                        </Box>
                    </>
                    
                ) : (
                        <>
                            {
                                questions.length > 0 && (
                                    <>

                                        <CardBody color='#F1FAEE'>
                                            <Flex>
                                                <Box flex='1'>
                                                    <Box className='question-count'>
                                                        <Flex gap={3}>
                                                            <Heading as='h2' size='2xl' >Question {currentQuestion + 1} / </Heading> <Heading mb={4}>    {questions.length}</Heading>
                                                        </Flex>
                                                    </Box>
                                                    <Text fontSize='3xl' >{questions[currentQuestion].questionText}</Text>
                                                </Box>
                                                <Box flex='1'>

                                                    <Flex flexDirection='column' gap={4}>
                                                        {questions[currentQuestion].answers.map((answerOption) => (
                                                            <Button size='md' bg='#1D3557' _active={{
                                                                bg: '#dddfe2',
                                                                transform: 'scale(0.98)',
                                                                borderColor: '#F1FAEE',
                                                            }} _hover={{ bg: '#457B9D' }}
                                                                _focus={{
                                                                    boxShadow:
                                                                        '0 0 1px 2px rgba(88, 144, 255, .85), 0 1px 1px rgba(0, 0, 0, .20)',
                                                                }} color='#F1FAEE' height='48px' width='100%' border='4px' borderColor='#457B9D' onClick={() => handleAnswer(questions[currentQuestion].id, answerOption.answerText)}>{answerOption.answerText}</Button>
                                                        ))}
                                                    </Flex>
                                                </Box>
                                            </Flex>

                                        </CardBody>
                                        <Box >

                                            <Flex minWidth='max-content' alignItems='center' direction='row'>
                                                {currentQuestion > 0 && <IconButton isRound={true} fontSize='20px' _active={{
                                                    bg: '#dddfe2',
                                                    transform: 'scale(1.28)',
                                                    borderColor: '#F1FAEE',
                                                }} _hover={{ bg: '#A8DADC' }} onClick={handlePrev} icon={<ArrowLeftIcon />} />}
                                                <Spacer />
                                                {currentQuestion < questions.length - 1 && <IconButton isRound={true} fontSize='20px' _active={{
                                                    bg: '#dddfe2',
                                                    transform: 'scale(1.28)',
                                                    borderColor: '#F1FAEE',
                                                }} _hover={{ bg: '#A8DADC' }} onClick={handleNext} icon={<ArrowRightIcon />} />}
                                                {currentQuestion === questions.length - 1 && (
                                                    <IconButton isRound={true} fontSize='20px' bg='#52b788' _active={{
                                                        bg: '#dddfe2',
                                                        transform: 'scale(1.28)',
                                                        borderColor: '#F1FAEE',
                                                    }} _hover={{ bg: '#95d5b2', transform: 'scale(1.4)' }} onClick={handleSubmit} icon={<CheckIcon />} />
                                                )}
                                            </Flex>
                                        </Box>
                                        <Box mt='15px' border='1px' borderRadius='8px' p='5px' borderColor='#457B9D'>
                                            <Progress value={(currentQuestion + 1) / questions.length * 100} size='xs' colorScheme='pink' />
                                        </Box>

                                    </>

                                )
                            }
                        </>                 

                )}
                </Card>
        </Center>
    );
}
export default UserHome;
