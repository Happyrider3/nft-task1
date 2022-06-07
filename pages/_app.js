/* pages/_app.js */
import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">NFT mint & staking</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-pink-500">
              Home
            </a>
          </Link>
          <Link href="/nft-mint">
            <a className="mr-6 text-pink-500">
              NFT MINT
            </a>
          </Link>
          <Link href="/nft-staking">
            <a className="mr-6 text-pink-500">
              NFT STAKING
            </a>
          </Link>
          {/* <Link href="/dashboard">
            <a className="mr-6 text-pink-500">
              Dashboard
            </a>
          </Link> */}
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp