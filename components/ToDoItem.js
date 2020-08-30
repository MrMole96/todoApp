import React, { useState } from 'react'
import { Heading, Text, Flex, Box, Button } from 'rebass'
import { Label, Checkbox, Textarea } from '@rebass/forms'
import { todoListItems } from '../Recoil/Atoms'
import {
    RecoilRoot, useSetRecoilState, useRecoilValue, useRecoilState
} from 'recoil';
import Head from 'next/head';
import moment from 'moment'
import { Card } from 'rebass/styled-components'
import styled from 'styled-components';
import { useRouter } from 'next/router';

function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}




const Container = styled((props) => <Card {...props} />)`
    background:'red'
`

export const ToDoItem = ({ item }) => {
    const router = useRouter();
    const [text, setText] = useState('')
    const [canEdit, setCanEdit] = useState(false)
    const [todoList, setTodoList] = useRecoilState(todoListItems)


    const handleEditable = () => {
        if (canEdit && text !== "") {
            const newList = replaceItemAtIndex(todoList, todoList.findIndex(x => x === item), {
                ...item,
                title: text,
            });

            setTodoList(newList);
        }
        setCanEdit((value) => !value)
    }

    const handleCompleted = () => {
        const newList = replaceItemAtIndex(todoList, todoList.findIndex(x => x === item), {
            ...item,
            completed: !item.completed,
        });

        setTodoList(newList);
    }

    const handleChangeText = (event) => {
        var value = event.target.value;
        setText(value);
    }

    return (
        <Container
            my={3}
            p={3}
            mx={'auto'}
            width={'100%'}
            sx={{
                p: 1,
                borderRadius: 10,
                boxShadow: '0 0 16px rgba(0, 0, 0, .25)',
            }}

            maxWidth={'500px'}
            backgroundColor={item.completed ? "#efecec" : "#FFF"}>
            <Flex height={'100%'} flexDirection={'column'} justifyContent={'space-between'} flexWrap={'wrap'}>
                <Box px={2} py={2} >
                    <Flex flexDirection={'column'} justifyContent={'space-between'}>
                        {canEdit ?
                            <Textarea defaultValue={item.title} onChange={(e) => handleChangeText(e)} />
                            :
                            <Heading>
                                {item.title}
                            </Heading>
                        }

                        <Label my={2} alignItems={'center'}>
                            <Checkbox
                                id='remember'
                                name='remember'
                                value={item.completed}
                                checked={item.completed}
                                onChange={() => handleCompleted()}
                            />
                            <strong>{item.completed ? "Done" : "Not done yet"}</strong>
                        </Label>
                        <span>{moment(item.created_at).format('HH:mm DD-MM-YYYY Z')}</span>
                    </Flex>
                </Box>

                <Flex flexWrap={'wrap'} mx={'auto'} >
                    <Button style={{ background: '#3d5af1' }} m={1} onClick={() => router.push('/tasks/[id]', `/tasks/${item.id}`)}>Show</Button>
                    <Button style={{ background: canEdit ? "green" : '#facf5a' }} m={1} onClick={() => handleEditable()}>{canEdit ? "Save" : "Edit"}</Button>
                </Flex>

            </Flex>
        </Container>
    )
}
