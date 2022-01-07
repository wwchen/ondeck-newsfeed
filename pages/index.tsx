import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <h1>Hello there!</h1>
      <ul>
        <li><Link href="/feed/founders">Founders feed</Link></li>
        <li><Link href="/feed/angels">Angels feed</Link></li>
        <li><Link href="/feed/writers">Writers feed</Link></li>
      </ul>
      <span>Check out these pages:</span>
      <ul>
        <li><Link href="/announcements/5">Latest announcement </Link></li>
        <li>Project <Link href="/projects/10">Blue Onion Labs</Link></li>
        <li>User <Link href="/users/11">Cai Burris</Link></li>
      </ul>
    </Layout>
  )
}
