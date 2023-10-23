import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import Popup from "reactjs-popup";
import {
    Card,
    CardHeader,
    Heading,
    CardFooter,
    Button,
    Radio,
    Center,
    Stack,
    RadioGroup,
    CardBody,
    Box,
    Flex,
} from "@chakra-ui/react";
import { useNavigate } from "../../node_modules/react-router-dom/index";
import { FaTrophy, FaStar, FaSadTear } from "react-icons/fa";
import "./UserHome.css";

function UserHome() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isPopupOpen, setPopoupOpen] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const getQuestions = async (e) => {
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

    const handleRadioChange = (questionId, selectedAnswerText) => {
        setUserAnswers((prevUserAnswers) =>
            prevUserAnswers.map((userAnswer) =>
                userAnswer.questionId === questionId
                    ? { ...userAnswer, userAnswer: selectedAnswerText }
                    : userAnswer
            )
        );
        console.log(userAnswers);
    };

    const handleSubmit = async () => {
        try {
            const { data } = await UserService.answerQuestion(userAnswers);
            setPercentage(data);
            setPopoupOpen(true);
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
        <Box>
            <Center>
                <Flex flexDirection="column">
                    <Card
                        w="70vw"
                        align="center"
                        bgGradient="linear(#F4DFB6 0%, #DE8F5F 25%, #DE8F5F 50%)"
                    >
                        {questions.length > 0 && (
                            <>
                                <CardHeader>
                                    <Heading color={"blue.700"} fontFamily={"mono"} size="md">
                                        Quiz Questions
                                    </Heading>
                                </CardHeader>
                                <Stack spacing="4" w="50vw">
                                    {questions.map((question) => (
                                        <Card key={question.id} h="200px" alignItems={"center"}>
                                            <CardHeader>
                                                <Heading size="md">{question.questionText}</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <RadioGroup>
                                                    <Stack direction="row" spacing="10">
                                                        {question.answers.map((answer) => (
                                                            <Radio
                                                                size="lg"
                                                                name="1"
                                                                colorScheme="pink"
                                                                key={answer.id}
                                                                value={answer.answerText}
                                                                onChange={(e) =>
                                                                    handleRadioChange(question.id, e.target.value)
                                                                }
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
            <Popup
                className="popup-content"
                open={isPopupOpen}
                closeOnDocumentClick={false}
                onClose={() => {
                    setPopoupOpen(false);
                }}
                modal
                nested
            >
                {(close) => (
                    <Box colorScheme="red">
                        <Center>
                            <Flex direction="column" gap={3}>
                                <Box>
                                    {percentage > 80 ? (
                                        <FaTrophy color="#c9a132" size="5em" />
                                    ) : percentage > 50 && percentage < 80 ? (
                                        <FaStar color="#c9a132" size="5em" />
                                    ) : (
                                        <FaSadTear color="#9A4444" size="5em" />
                                    )}
                                </Box>
                                <Heading>{percentage} %</Heading>
                                <Button colorScheme="yellow" onClick={redirectToResults}>
                                    Results
                                </Button>
                            </Flex>
                        </Center>
                    </Box>
                )}
            </Popup>
        </Box>
    );
}
export default UserHome;
