import React from 'react'
import {
    RecoilRoot, useSetRecoilState, useRecoilValue, useRecoilState
} from 'recoil';
import fetch from 'isomorphic-unfetch'
import { todoListItems, hideCompleted } from '../Recoil/Atoms'
import { Box, Flex, Heading } from 'rebass';
import { ToDoItem } from './ToDoItem'
import { getAllTodoItems } from '../Recoil/Selectors';
import { Label, Input, Checkbox } from '@rebass/forms';
import styled from 'styled-components';

const Container = styled.div`
    width:100%;

`

const ToDoList = (props) => {
    const isVisible = useRecoilValue(hideCompleted)
    return (
        <Container>
            <Flex width={'100%'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'space-between'}>
                <Box>
                    <Label htmlFor='search'>Search:</Label>
                    <Input
                        id='search'
                        name='search'
                        type='text'
                        backgroundColor={'white'}
                        placeholder='Search...'
                        onChange={(e) => props.handleSearch(e.target)}
                    />
                </Box>
                <Box >
                    <Label htmlFor='visible' justifyContent={'flex-end'} alignItems={'center'}>
                        <Checkbox
                            id='visible'
                            name='visible'
                            value={isVisible}
                            checked={isVisible}
                            onChange={() => props.handleVisibility()}
                        />
                        <strong>Show completed</strong></Label>
                </Box>
            </Flex>
            {props.items.length !== 0 ?
                <Box sx={{
                    display: 'grid',
                    gridGap: 4,
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                }}>{props.items.map(item => <ToDoItem item={item} key={item.id} />)}</Box>
                : (<Heading mt={5} textAlign={'center'}>No tasks...</Heading>)}
        </Container>
    )
}


export default ToDoList;