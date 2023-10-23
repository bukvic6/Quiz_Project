import React, { Component } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { NavMenu } from "./NavMenu";

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <Flex flexDirection="column">
                <Box>
                    <NavMenu
                        updateLoginStatus={this.props.updateLoginStatus}
                        isLoggedIn={this.props.isLoggedIn}
                    />
                </Box>
                <Box h="calc(100vh - 10vh)" tag="main">
                    {this.props.children}
                </Box>
            </Flex>
        );
    }
}