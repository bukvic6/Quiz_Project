import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from '../../node_modules/react-router-dom/index';
import { Button, Center, SimpleGrid, Card, Image, Stack, CardBody, Heading, Input, CardFooter } from '@chakra-ui/react'

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
            <Card
            w='50%'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'>
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '400px' }}
                    src='https://images.unsplash.com/photo-1662072629492-b86a9d8e16b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                alt='quiz'
            />

            <Stack>
                <form onSubmit={handleLogin}>
                    <CardBody h='40vh'>
                            <SimpleGrid spacing={ 6 }>
                                <Heading size='md'>Welcome</Heading>
                                <Input size='lg' className="logininput" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" name="uname" />
                                <Input size='lg' className="logininput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" name="psw" />
                        </SimpleGrid >
                    </CardBody>

                <CardFooter>
                    <Button variant='solid' type="submit" colorScheme='blue'>
                        Login
                    </Button>
                </CardFooter>
               </form>
            </Stack>
        </Card>
        </Center>

    )

}
export default LoginPage;
