import React, { useState } from 'react'
import { Label, Input } from '@rebass/forms'
import { Button, Link, Flex, Box } from 'rebass'
import { RecoilRoot, useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import { todoListItems } from '../Recoil/Atoms'
import Layout from '../Layout/Main'
import { getAllTodoItems } from '../Recoil/Selectors'
import styled from 'styled-components'

const Container = styled.div`
    padding:10px;
    margin:10px auto;
    background-color:#FFF;
    border-radius: 10px;
    box-shadow: 0 0 16px rgba(0, 0, 0, .25);
    border-radius:10px;
    max-width:600px;
    display:flex;
    flex-direction:column;
`


const Create = (props) => {
    const router = useRouter();
    const [task, setTask] = useState("")
    const addToList = useSetRecoilState(todoListItems);

    const handleSaveItem = () => {
        addToList((oldItems) => {
            return [...oldItems, {
                id: Date.now(),
                created_at: Date.now(),
                title: task,
                completed: false
            },
            ]
        })
        router.push('/')
    }

    const handleChange = ({ target }) => {
        var value = target.value;
        setTask(() => value)
    }

    return (

        <Container >
            <form>
                <Label fontSize={3} htmlFor='task'>Task:</Label>
                <Input id='task' minWidth={'300px'}
                    name='task'
                    type='text'
                    placeholder='Task description'
                    onChange={(e) => handleChange(e)}
                    backgroundColor={'white'}
                    mb={3} />

            </form>
            <Flex justifyContent={'center'}>
                <Button onClick={handleSaveItem} backgroundColor={'blue'} mr={2}>Add</Button>
                <Button onClick={() => router.push('/')} backgroundColor={'#6c757d'} mr={2}>Back</Button>
            </Flex>
        </Container>

    )
}

export default Create