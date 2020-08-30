import Head from 'next/head'
import { Nav } from '../components/Nav'
import styled from 'styled-components'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

const Wrapper = styled.div`
    margin:0 auto;
    padding:5rem;
    background-color: #f5c16c;
    display:flex;
    flex-flow:column;
    min-height:100vh;
`



export default ({ children, title = 'TODO App' }) => (
    <ThemeProvider theme={theme}>
            <Wrapper>
                {children}
            </Wrapper>
    </ThemeProvider>
)