import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from '../../node_modules/react-router-dom/index';
import lama from './../assets/lama.png';

import { Button, Flex, Box, Text, Center, Image, Heading, Input } from '@chakra-ui/react'

function LoginPage(props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();
        const login = { email: email, password: password };
        try {
            const { data } = await AuthService.Login(login);
            const userDataJSON = JSON.stringify({
                email: data.email,
                role: data.role,
                token: data.token,
            })
            localStorage.setItem('token', userDataJSON);
            props.updateLoginStatus(true);
            navigate("/home")
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <Center h="100%">

            <Flex direction='row'>
                <Box boxShadow='dark-lg' p='6' rounded='md' bg='white' align='center'>
                    <Image
                        borderRadius='lg'
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '400px' }}
                        src={lama}
                        alt='quiz'
                    />
                    <Text fontSize='2xl' mt='10px'>Which Animal Would You Be?</Text>
                </Box>
                <Box p='70px' boxShadow='dark-lg' rounded='md' bg='white'>
                        <form onSubmit={handleLogin} >
                        <Flex direction='column' align='center' gap={ 5 }>
                        <Heading size='lg'>Animal quiz</Heading>
                        <Input size='lg' className="logininput" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" name="uname" />
                        <Input size='lg' className="logininput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" name="psw" />
                        <Button variant='solid' type="submit" colorScheme='blue'>
                            Login
                            </Button>
                        </Flex>
                         </form>
                </Box>
            </Flex>
        </Center>

    )

}
export default LoginPage;
