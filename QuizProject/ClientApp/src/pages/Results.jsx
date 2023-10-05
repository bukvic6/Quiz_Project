import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { TableContainer, Table, Thead, Th, Tr, Td, Tbody, Box, Center, Flex, Button, FormControl, Input, Divider, AbsoluteCenter } from '@chakra-ui/react'


function Results() {
    const [results, setResults] = useState([]);


    const getResults = async () => {
        console.log("Hello")

        try {
            const { data } = await UserService.getResults()
            setResults(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }           
    }
    useEffect(() => {
        getResults();
    }, [])
    return (
        <Box>
            <Center>
                <Flex flexDirection='column'>
                    <Box position='relative' padding='10'>
                        <Divider />
                        <AbsoluteCenter bg='white' px='6'>
                            Quiz results
                        </AbsoluteCenter>
                    </Box>
                    <TableContainer w='70vw'>
                        <Table variant='striped' colorScheme='blackAlpha'>
                            <Thead>
                                <Tr>
                                    <Th>Username</Th>
                                    <Th>Points</Th>

                                </Tr>
                            </Thead>
                            <Tbody>
                                {results.map((val, key) => {
                                    return (
                                        <Tr key={key}>
                                            <Td>{val.user}</Td>
                                            <Td>{val.points}</Td>
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
export default Results;