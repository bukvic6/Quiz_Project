import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Flex, Box, Spacer } from '@chakra-ui/react'
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
        <Flex  flexDirection='column'>
            <Box >
                <NavMenu />
            </Box>
            <Box h = 'calc(100vh - 10vh)'  tag="main">
                  {this.props.children}               
            </Box>
        </Flex>
    );
  }
}
