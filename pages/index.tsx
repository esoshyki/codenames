import type { NextPage } from 'next'
import Layout from '../components/Layout';
import Menu from '../components/Menu';

const Home: NextPage = () => {
  return (
    <Layout>
        <Menu />
    </Layout>
  )
}

export default Home