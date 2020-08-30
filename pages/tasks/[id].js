import React from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState, RecoilRoot, useRecoilValueLoadable } from 'recoil'
import { todoListItems, deletedTask } from '../../Recoil/Atoms'
import fetch from 'isomorphic-unfetch'
import { Box, Heading, Button, Flex } from 'rebass'
import { Checkbox, Label } from '@rebass/forms'
import styled from 'styled-components'
import moment from 'moment'
import { useRouter } from 'next/router';

const Container = styled.div`
    padding:10px;
    margin:10px auto;
    background-color:#FFF;
    border-radius: 10;
    box-shadow: '0 0 16px rgba(0, 0, 0, .25)';
    border-radius:10px;
    max-width:600px;
    display:flex;
    flex-direction:column;
`

const Post = (props) => {
    const router = useRouter();

    const [tasks, setList] = useRecoilState(todoListItems);
    const [taskDeleted, setItemToDelete] = useRecoilState(deletedTask)
    const task = tasks.filter(x => x.id == router.query.id)[0];

    if (task !== undefined) {
        var { completed, created_at, title, id } = task
    } else {
        var { completed, created_at, title, id } = taskDeleted;
    }

    const handleDelete = () => {
        var index = tasks.findIndex(x => x.id === id)
        setItemToDelete(tasks[index])
        setList((oldItems) => {
            return oldItems.filter(x => x.id !== id)
        });
        router.push('/')
    }

    return (
        <Container>
            <Heading>{title}</Heading>
            <Label my={2} alignItems={'center'}>
                <Checkbox
                    id='remember'
                    name='remember'
                    value={completed}
                    disabled={true}
                    checked={completed}
                />
                <strong>{completed ? "Done" : "Not done yet"}</strong>
            </Label>
            <Label>{moment(created_at).format('HH:mm DD-MM-YYYY Z')}</Label>
            <Box mx={'auto'} mt={3}>
                <Button backgroundColor={'#f3558e'} mr={2} onClick={() => handleDelete()}>Delete</Button>
                <Button backgroundColor={"#6c757d"} onClick={() => router.push('/')}>Back</Button>
            </Box>
        </Container>
    )
}

export default Post;

// export async function getStaticPaths() {
//     const res = await fetch('https://gorest.co.in/public-api/todos')
//     const data = await res.json()
//     const posts = data.data;


//     const paths = posts.map((post) => ({
//         params: { id: post.id.toString() },
//     }))

//     return { paths, fallback: false }
// }

// export async function getStaticProps({ params }) {
//     const res = await fetch(`https://gorest.co.in/public-api/todos/${params.id}`)
//     const task = await res.json()

//     return { props: { task } }
// }