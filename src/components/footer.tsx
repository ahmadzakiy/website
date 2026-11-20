import Link from "next/link"

export default function Footer() {
  return (
    <footer className="site-footer">
      <Link className="footer-signature" href="/">
        Ahmad Zakiy<span>Design & engineering.</span>
      </Link>
      <p>Made with care in Jakarta.</p>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  )
}
