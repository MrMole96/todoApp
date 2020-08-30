import Head from 'next/head'
import {
  atom, selector, RecoilRoot, useRecoilValue, useSetRecoilState, useResetRecoilState, useRecoilState
} from 'recoil';
import Layout from '../Layout/Main'
import {
  Box,
  Card,
  Image,
  Heading,
  Text,
  Button,
  Flex,
  Link
} from 'rebass'

import fetch from 'isomorphic-unfetch'

import ToDoList from '../components/ToDoList'
import { getAllTodoItems, doneNotDoneCounter } from '../Recoil/Selectors';
import { useEffect } from 'react';
import { todoListItems, searchTerm, hideCompleted } from '../Recoil/Atoms';
import { useRouter } from 'next/router';
import { route } from 'next/dist/next-server/server/router';

const Home = ({ fetchedItems }) => {
  const router = useRouter();
  const [items, setItems] = useRecoilState(getAllTodoItems)
  const [term, setSearch] = useRecoilState(searchTerm)
  const setVisible = useSetRecoilState(hideCompleted)
  const counter = useRecoilValue(doneNotDoneCounter)
  
  useEffect(() => {
    if (items.length === 0 && term === '') {
      setItems(fetchedItems)
    }
    setSearch('')
  }, [])


  const handleSearch = ({ value }) => {
    setSearch(value)
  }

  const handleVisibility = () => {
    setVisible((val) => !val)
  }

  return (
    <>
      <Flex width={'100%'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'space-between'}>
        <Heading my={2} fontSize={30}>
          TODO App
       </Heading>
        <Heading my={2} fontSize={20}>Done: {counter.completed} / Not done: {counter.notCompleted}</Heading>
        <Button my={2}
          color={'#3d5af1'}
          backgroundColor={'white'}
          onClick={() => router.push('/create')}>
          New task
        </Button>
      </Flex>
      <ToDoList items={items} handleSearch={handleSearch} handleVisibility={handleVisibility} />
    </>
  )
}

export default Home;

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const response = await fetch('https://gorest.co.in/public-api/todos')
  var fetchedItems = (await response.json()).data

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      fetchedItems,
    },
  }
}